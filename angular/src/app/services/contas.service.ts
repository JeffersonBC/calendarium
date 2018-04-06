import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { HttpService } from './http.service';
import { Login, NovoUsuario } from '../contas/models/usuario.model';


@Injectable()
export class ContasService {

  constructor(private httpService: HttpService) { }

  public postNovoUsuario(usuario: NovoUsuario) {
    return this.httpService.post('http://localhost:8000/api/accounts/user_create/', usuario)
      .map(response => response);
  }

  public postLogin(login_info: Login) {
    return this.httpService.post('http://localhost:8000/api/accounts/auth_token_get/', login_info)
      .map(response => response);
  }

  public getUsuarioLogado() {
    return this.httpService.get('http://localhost:8000/api/accounts/user_get_current/')
      .map(response => response);
  }

  public RenovarAuthToken() {
    const auth_token = localStorage.getItem('auth_token');
    console.log(auth_token);

    if (auth_token) {
      const auth_token_payload = {
        token: localStorage.getItem('auth_token'),
      };

      this.httpService.post('http://localhost:8000/api/accounts/auth_token_refresh/', auth_token_payload)
        .map(response => response)
        .subscribe(
          dados => {
            localStorage.setItem('auth_token', dados['token']);
          }
        );
    }
  }
}
