import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { ConviteService } from '../../services/convite.service';


@Injectable()
export class EventosConvidarResolver implements Resolve<any> {
  constructor(
    private convitesService: ConviteService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.convitesService.getConviteDetalhesEvento(route.params.id);
  }
}
