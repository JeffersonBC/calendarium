import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LoginEmitService } from '../services/login-emit.service';
import { ContasService } from '../services/contas.service';
import { EventosService } from '../services/eventos.service';
import { FormService } from '../services/form.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public loggedIn = false;
  public user_first_name = '';

  public eventos: any[] = [];

  constructor(
    public formService: FormService,

    private contasService: ContasService,
    private eventosService: EventosService,
    private loginEmitService: LoginEmitService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.loginEmitService.changeEmitted$.subscribe(
      bool => {
        this.loggedIn = bool;
      }
    );

    const token = localStorage.getItem('auth_token');
    if (token) {
      this.loggedIn = true;
      this.getUserName();

      // Se logado, busca 5 próximos eventos
      this.route.data.map(dados => dados['proximos']).subscribe(
        dados => {
          if (dados['success']) {
            this.eventos = dados['msg'];
          }
        }
      );

    }
  }

  getUserName() {
    this.contasService.getUsuarioLogado().subscribe(
      dados => this.user_first_name = dados['msg']['first_name'],
      (error: any) => console.log(error)
    );
  }
}
