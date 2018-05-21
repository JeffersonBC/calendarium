import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router
  ) { }

  private verificarAcesso() {
    if (localStorage.getItem('auth_token')) {
      return true;
    }

    this.router.navigate(['/conta/login']);
    return false;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    return this.verificarAcesso();
  }

  canLoad(
    route: Route
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.verificarAcesso();
  }

}
