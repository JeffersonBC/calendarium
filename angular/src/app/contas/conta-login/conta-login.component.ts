import { Component, OnInit, Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { FormService } from '../../services/form.service';
import { LoginEmitService } from '../../services/login-emit.service';


@Component({
  selector: 'app-conta-login',
  templateUrl: './conta-login.component.html',
  styleUrls: ['./conta-login.component.css']
})
export class ContaLoginComponent implements OnInit {

  public formulario: FormGroup;

  public loginError = false;
  public errorMessage = '';

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private loginEmitService: LoginEmitService,
    public formService: FormService,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  tryLogin() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    this.http.post(
      'http://localhost:8000/api/accounts/get_auth_token/',
      JSON.stringify(this.formulario.value),
      httpOptions
    )
      .map(response => response)
      .subscribe(
        dados => {
          if (dados['token']) {
            localStorage.setItem('auth_token', dados['token']);

            this.loginEmitService.emitChange(true);

            this.router.navigate(['']);

          } else {
            console.error(JSON.stringify(dados));

            this.loginError = true;
            this.errorMessage = 'O servidor de login respondeu de maneira incorreta.';

            this.formulario.patchValue({password: ''});
          }

        },
        (error: any) => {
          console.error(JSON.stringify(error));
          this.loginError = true;
          this.errorMessage = 'Ocorreu algum erro ao tentar se conectar ao servidor.';

          this.formulario.patchValue({password: ''});
        }
      );

  }

}
