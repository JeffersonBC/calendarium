import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConviteService } from '../../services/convite.service';


@Injectable()
export class EventosConvitesResolver implements Resolve<any> {
  constructor(
    private convitesService: ConviteService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.convitesService.getConviteListar()
    .pipe(catchError((error, caught) => {
      return of({
        'success': false,
        'msg': []
      });
    }));
  }
}
