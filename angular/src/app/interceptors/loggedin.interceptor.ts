import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';

import { throwError,  Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LoginEmitService } from '../services/login-emit.service';
import { ContasService } from '../services/contas.service';

@Injectable()
export class LoggedInInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private loginEmitService: LoginEmitService,
    private contasService: ContasService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('auth_token') !== null) {
      req = req.clone({
        setHeaders: {
          Authorization: 'JWT ' + localStorage.getItem('auth_token')
        }
      });
    }

    return next.handle(req)
      .pipe(catchError((error, caught) => {
        // Se backend retornar erro significa que o token é inválido ou expirou
        if (error.status === 401) {
          this.loginEmitService.emitChange(false);
          localStorage.removeItem('auth_token');

          this.router.navigate(['conta/login']);
          return throwError(error);
        }

        return throwError(error);

      }) as any);
  }
}
