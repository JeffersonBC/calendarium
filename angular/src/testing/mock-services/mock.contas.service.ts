import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import {
  getUsuarioLogadoObject,
  postLoginObject,
} from '../mock-objects/mock.contas.objects';

import { Login } from '../../app/contas/models/usuario.model';


export const MockContasService = {
  getUsuarioLogado() {
    return Observable.of(getUsuarioLogadoObject).map(response => response);
  },

  postLogin(login_info: Login) {
    return Observable.of(postLoginObject).map(response => response);
  },
};
