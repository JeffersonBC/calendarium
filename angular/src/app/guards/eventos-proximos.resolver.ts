import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { EventosService } from '../services/eventos.service';
import { ContasService } from '../services/contas.service';


@Injectable()
export class EventosProximosResolver implements Resolve<any> {
  constructor(
    private eventosService: EventosService,
    private contasService: ContasService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | any {

    if (this.contasService.authTokenGet()) {
      return this.eventosService.getEventosProximos(5);

    } else {
      return {};
    }
  }
}


@Injectable()
export class NomeUsuarioResolver implements Resolve<any> {
  constructor(
    private eventosService: EventosService,
    private contasService: ContasService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | any {

    if (this.contasService.authTokenGet()) {
      return this.contasService.getUsuarioLogado();

    } else {
      return {};
    }
  }
}
