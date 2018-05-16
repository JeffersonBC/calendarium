import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';

import { CacheEventosService } from '../../services/cache-eventos.service';
import { DataAtualService } from '../../services/data-atual.service';

import { EventoDetalhes } from '../models/evento.model';
import { catchError } from 'rxjs/operators';


@Injectable()
export class EventosListaResolver implements Resolve<EventoDetalhes[]> {

  constructor(
    private cacheEventosService: CacheEventosService,
    private dataAtual: DataAtualService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | any {

    if (!this.cacheEventosService.cache[`${this.dataAtual.ano}`]['carregado']) {
      return this.cacheEventosService.carregarAnoObservable(this.dataAtual.ano)
      .pipe(
        catchError(
          (error, caught) => {
            return of({
              'success': false,
              'msg': []
            });
          }
        )
      );

    } else {
      return of({});
    }
  }
}
