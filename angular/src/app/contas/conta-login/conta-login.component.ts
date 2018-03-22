import { Component, OnInit, Injectable, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ContasService } from '../../services/contas.service';
import { FormService } from '../../services/form.service';
import { LoginEmitService } from '../../services/login-emit.service';
import { Login } from '../models/usuario.model';

declare const Materialize;


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
    private contasService: ContasService,
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

    Materialize.updateTextFields();
  }

  tryLogin() {
    const login_info: Login = this.formulario.value;

    console.log(login_info);

    this.contasService.postLogin(login_info).subscribe(
      dados => {
        console.log(dados);

        if (dados['token']) {
          localStorage.setItem('auth_token', dados['token']);
          this.loginEmitService.emitChange(true);
          this.router.navigate(['']);

        }
      }
    );
  }
}
