import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LoginEmitService } from '../services/login-emit.service';
import { ContasService } from '../services/contas.service';
import { EventosService } from '../services/eventos.service';
import { FormService } from '../services/form.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
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
      isLoggedIn => this.loggedIn = isLoggedIn
    );

    // Carrega eventos e nome do usuario do resolver
    this.route.data.map(dados => dados).subscribe(
      dados => {
        if (dados['proximos']['success']) {
          this.loggedIn = true;
          this.eventos = dados['proximos']['msg'];
        }

        if (dados['usuario']['success']) {
          this.user_first_name = dados['usuario']['msg']['first_name'];
        }
      }
    );

  }
}
