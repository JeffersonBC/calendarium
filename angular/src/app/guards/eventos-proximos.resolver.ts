import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { EventosService } from '../services/eventos.service';


@Injectable()
export class EventosProximosResolver implements Resolve<any> {
  constructor(
    private eventosService: EventosService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | any {

    if (localStorage.getItem('auth_token')) {
      return this.eventosService.getEventosProximos(5);

    } else {
      return {};
    }
  }
}
