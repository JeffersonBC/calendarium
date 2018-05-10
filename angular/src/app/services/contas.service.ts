import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpService } from './http.service';
import { LoginEmitService } from './login-emit.service';

import { Login, NovoUsuario } from '../contas/models/usuario.model';
import { environment } from '../../environments/environment';


@Injectable()
export class ContasService {

  constructor(
    private httpService: HttpService,
    private loginEmitService: LoginEmitService,
  ) { }

  public postNovoUsuario(usuario: NovoUsuario) {
    return this.httpService.post(environment.backendUrl + '/api/accounts/user_create/', usuario)
      .pipe(map(response => response));
  }

  public postLogin(login_info: Login) {
    return this.httpService.post(environment.backendUrl + '/api/accounts/auth_token_get/', login_info)
      .pipe(map(response => response));
  }

  public getUsuarioLogado() {
    return this.httpService.get(environment.backendUrl + '/api/accounts/user_get_current/')
      .pipe(map(response => response));
  }

  public getAuthTokenVerificar() {
    const auth_token = localStorage.getItem('auth_token');

    if (auth_token) {
      const auth_token_payload = {
        token: localStorage.getItem('auth_token'),
      };

      return this.httpService.post(environment.backendUrl + '/api/accounts/auth_token_verify/', auth_token_payload)
        .pipe(map(response => response));

    } else {
      return null;
    }
  }

  public authTokenSet(auth_token: string) {
    localStorage.setItem('auth_token', auth_token);
    this.loginEmitService.emitChange(true);
  }

  public authTokenGet() {
    return localStorage.getItem('auth_token');
  }

  public authTokenLimpar() {
    localStorage.removeItem('auth_token');
    this.loginEmitService.emitChange(false);
  }

  public authTokenVerificar() {
    const auth_token = localStorage.getItem('auth_token');

    if (auth_token) {
      const auth_token_payload = {
        token: localStorage.getItem('auth_token'),
      };

      this.httpService.post(environment.backendUrl + '/api/accounts/auth_token_verify/', auth_token_payload)
        .pipe(map(response => response))
        .subscribe(
          dados => {
            this.loginEmitService.emitChange(true);
          },
          erro => {
            this.loginEmitService.emitChange(false);
          }
        );
    }
  }

  public authTokenRenovar() {
    const auth_token = localStorage.getItem('auth_token');

    if (auth_token) {
      const auth_token_payload = {
        token: localStorage.getItem('auth_token'),
      };

      this.httpService.post(environment.backendUrl + '/api/accounts/auth_token_refresh/', auth_token_payload)
        .pipe(map(response => response))
        .subscribe(
          dados => {
            localStorage.setItem('auth_token', dados['token']);
            this.loginEmitService.emitChange(true);
          },
          erro => {
            this.loginEmitService.emitChange(false);
          }
        );
    }
  }
}
