import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NovoUsuario } from '../models/usuario.model';
import { ContasService } from '../../services/contas.service';
import { Router } from '@angular/router';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-conta-registrar',
  templateUrl: './conta-registrar.component.html',
  styleUrls: ['./conta-registrar.component.css']
})
export class ContaRegistrarComponent implements OnInit {

  public formulario: FormGroup;
  public mensagemErro = '';

  constructor(
    private formBuilder: FormBuilder,
    private contasService: ContasService,
    private router: Router,

    public formService: FormService,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      password_1: [null, Validators.required],
      password_2: [null, Validators.required],
    });
  }

  registrar() {
    if (this.formulario.valid) {
      if (this.formulario.value['password_1'] !== this.formulario.value['password_2']) {
        this.mensagemErro = 'As senhas precisam ser iguais.';

      } else {
        const novoUsuario: NovoUsuario = {
          username: this.formulario.value['username'],
          email: this.formulario.value['email'],
          first_name: this.formulario.value['first_name'],
          last_name: this.formulario.value['last_name'],
          password: this.formulario.value['password_1'],
        };

        this.contasService.postNovoUsuario(novoUsuario).subscribe(
          dados => {
            if (dados['success']) {
              this.router.navigate(['']);

            } else {
              this.mensagemErro = dados['msg'];
            }
          },
          erro => {
            console.log(erro);
          }
        );
      }

    } else {
      this.formService.verificaValidacoesForm(this.formulario);
    }
  }
}
