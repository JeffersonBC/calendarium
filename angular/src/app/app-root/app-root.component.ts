import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { map } from 'rxjs/operators';

import { LoginEmitService } from '../services/login-emit.service';
import { CacheEventosService } from '../services/cache-eventos.service';
import { ConviteService } from '../services/convite.service';
import { ContasService } from '../services/contas.service';


@Component({
  selector: 'app-app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss']
})
export class AppRootComponent implements OnInit {

  public loggedIn = false;

  public qtdConvites = 0;
  private qtdConvitesInterval;

  private authTokenRenovarInterval;


  constructor(
    private router: Router,
    private route: ActivatedRoute,

    private loginEmitService: LoginEmitService,
    private eventosCacheService: CacheEventosService,
    private conviteService: ConviteService,
    private contasService: ContasService,
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });
  }

  ngOnInit() {
    // Como reagir caso usuário esteja logado ou não
    this.loginEmitService.changeEmitted$.subscribe(
      isLoggedIn => {
        // Usuário logado
        if (isLoggedIn) {

          // Caso emit positivo seja uma mudança de estado
          if (!this.loggedIn) {

            this.loggedIn = true;

            // 'Pinga' o servidor ao iniciar e depois a cada 20s para ver se recebeu algum convite novo
            this.checaConvitesServidor();
            this.qtdConvitesInterval = setInterval(
              () => { if (this.loggedIn) { this.checaConvitesServidor(); } } , 1000 * 20
            );

            // Se usuário aceitar/ rejeitar convite, diminui quantidade na hora
            this.conviteService.emitirQuantidade$.subscribe(
              n => this.qtdConvites += n
            );

            // Renova o token de autenticação ao executar o webapp, e depois de novo a cada 5 minutos
            this.contasService.authTokenRenovar();
            this.authTokenRenovarInterval = setInterval(
              () => { this.contasService.authTokenRenovar(); } , 1000 * 60 * 5
            );

          }

        // Usuário não logado
        } else {
          clearInterval(this.qtdConvitesInterval);
          clearInterval(this.authTokenRenovarInterval);
        }
      }
    );

    // Se tem um auth token guardado, verifica validade com o backend e emite o resultado em LoginEmitService
    this.route.data.pipe(map(dados => dados['isLogged'])).subscribe(
      dados => {
        this.loginEmitService.emitChange(dados['success']);
      },
      erro => this.loginEmitService.emitChange(false)
    );
  }

  public logoff() {
    this.loggedIn = false;

    this.contasService.authTokenLimpar();
    this.eventosCacheService.limparCache();

    this.router.navigate(['']);
  }

  private checaConvitesServidor() {
    this.conviteService.getConviteQuantidade().subscribe(
      dados => { this.qtdConvites = dados['msg']['count']; }
    );
  }

}
