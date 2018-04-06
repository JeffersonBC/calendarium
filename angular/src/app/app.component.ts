import { environment } from '../environments/environment';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/timeInterval';

import { LoginEmitService } from './services/login-emit.service';
import { CacheEventosService } from './services/cache-eventos.service';
import { ConviteService } from './services/convite.service';
import { ContasService } from './services/contas.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  public loggedIn = false;

  public qtdConvites = 0;
  private qtdConvites$;

  constructor(
    private router: Router,
    private loginEmitService: LoginEmitService,
    private eventosCacheService: CacheEventosService,
    private conviteService: ConviteService,
    private contasService: ContasService,
  ) {}

  ngOnInit() {
    // Checa se está logado agora e verifica mudanças de status de login
    if (localStorage.getItem('auth_token')) {
      this.loggedIn = true;
    }

    this.loginEmitService.changeEmitted$.subscribe(
      bool => {
        this.loggedIn = bool;
      }
    );

    // 'Pinga' o servidor ao iniciar e depois a cada 20s para ver se recebeu algum convite novo
    // Se usuário aceitar/ rejeitar convite, diminui quantidade na hora
    this.qtdConvites$ = this.conviteService.getConviteQuantidade();
    if (this.loggedIn) {
      this.checaConvitesServidor();
    }
    setInterval(() => {
        if (this.loggedIn) {
          this.checaConvitesServidor();
        }
      } , 1000 * 20
    );

    this.conviteService.emitirQuantidade$.subscribe(
      n => this.qtdConvites += n
    );

    // Renova o token de autenticação ao executar o webapp, e depois de novo a cada 5 minutos
    this.contasService.RenovarAuthToken();
    setInterval(() => { this.contasService.RenovarAuthToken(); } , 1000 * 60 * 5);
  }

  public logoff() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this.loginEmitService.emitChange(false);
    this.eventosCacheService.limparCache();

    this.router.navigate(['']);
  }

  private checaConvitesServidor() {
    this.qtdConvites$.subscribe(
      dados => {
        this.qtdConvites = dados['msg']['count'];
      }
    );
  }

}
