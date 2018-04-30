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
  styleUrls: ['./conta-login.component.scss']
})
export class ContaLoginComponent implements OnInit {

  public formulario: FormGroup;

  public errorMessage = '';

  constructor(
    private contasService: ContasService,
    private formBuilder: FormBuilder,
    private router: Router,
    public loginEmitService: LoginEmitService,
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

    this.contasService.postLogin(login_info).subscribe(
      dados => {
        if (dados['token']) {
          this.contasService.authTokenSet(dados['token']);
          this.router.navigate(['']);
        }

      }, error => {
        if (error['error']['non_field_errors']) {
          for (const message of error['error']['non_field_errors']) {
            this.errorMessage += message;
          }
        }
      }
    );
  }
}
