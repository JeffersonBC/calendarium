import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';

import { Evento } from '../models/evento.model';
import { EventosService } from '../../services/eventos.service';
import { catchError } from 'rxjs/operators';


@Injectable()
export class EventosDetalhesResolver implements Resolve<Evento> {
  constructor(
    private eventosService: EventosService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.eventosService.getEvento(route.params.id)
    .pipe(catchError((error, caught) => {
      return of({
        'success': false,
        'msg': []
      });
    }));
  }
}
