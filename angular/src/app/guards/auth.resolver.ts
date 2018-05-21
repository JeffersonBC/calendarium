import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { ContasService } from '../services/contas.service';


@Injectable()
export class AuthResolver implements Resolve<any> {
  constructor(
    private contasService: ContasService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | any {

    if (this.contasService.authTokenGet()) {
      return this.contasService.getAuthTokenVerificar();

    } else {
      return {};
    }
  }
}
