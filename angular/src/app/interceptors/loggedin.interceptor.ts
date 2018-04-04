import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpEvent,
    HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class LoggedInInterceptor implements HttpInterceptor {

    intercept( req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem('auth_token') !== null) {
            req = req.clone({
                setHeaders: {
                    Authorization: 'JWT ' + localStorage.getItem('auth_token')
                }
            });
        }

        return next.handle(req);
    }
}
