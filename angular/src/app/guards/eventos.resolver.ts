import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { CacheEventosService } from '../services/cache-eventos.service';
import { DataAtualService } from '../services/data-atual.service';

import { EventoDetalhes } from '../eventos/models/evento.model';


@Injectable()
export class EventosResolver implements Resolve<EventoDetalhes[]> {

  constructor(
    private cacheEventosService: CacheEventosService,
    private dataAtual: DataAtualService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | any[] {

    if (!this.cacheEventosService.cache[`${this.dataAtual.ano}`]['carregado']) {
      return this.cacheEventosService.carregarAnoObservable(this.dataAtual.ano);

    } else {
      return [];
    }
  }
}
