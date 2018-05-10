import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { Evento } from '../models/evento.model';
import { EventosService } from '../../services/eventos.service';


@Injectable()
export class EventosDetalhesResolver implements Resolve<Evento> {
  constructor(
    private eventosService: EventosService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.eventosService.getEvento(route.params.id);
  }
}
