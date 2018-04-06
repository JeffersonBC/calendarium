import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

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
      .catch((error, caught) => {
        // Se backend retornar '401 Unauthorized', significa que o token é inválido ou expirou
        if (error.status === 401) {
          this.loginEmitService.emitChange(false);
          localStorage.removeItem('auth_token');

          this.router.navigate(['conta/login']);
          return Observable.throw(error);
        }

        return Observable.throw(error);

      }) as any;
  }
}
