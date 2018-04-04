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
}
