import { Component, OnInit } from '@angular/core';

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
    private contasService: ContasService,
    private loginEmitService: LoginEmitService,
    private eventosService: EventosService,
    public formService: FormService,
  ) {

    loginEmitService.changeEmitted$.subscribe(
      bool => {
        this.loggedIn = bool;
      }
    );

    this.eventosService.getEventosProximos(5).subscribe(
      dados => {
        if (dados['success']) {
          this.eventos = dados['msg'];
        }
      }
    );
  }

  ngOnInit() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.loggedIn = true;
      this.getUserName();
    }
  }

  getUserName() {
    this.contasService.getUsuarioLogado().subscribe(
      dados => this.user_first_name = dados['msg']['first_name'],
      (error: any) => console.log(error)
    );
  }
}
