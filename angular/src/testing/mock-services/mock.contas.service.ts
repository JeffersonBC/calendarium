import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import {
  getUsuarioLogadoObject,
  postLoginObject,
  postLoginObjectFailure,
} from '../mock-objects/mock.contas.objects';

import { Login } from '../../app/contas/models/usuario.model';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';


export const MockContasService = {
  getUsuarioLogado() {
    return Observable.of(getUsuarioLogadoObject).map(response => response);
  },

  postLogin(login_info: Login) {
    if (login_info.username === 'Teste' && login_info.password === 'a12345678') {
      return Observable.of(postLoginObject).map(response => response);

    } else {
      return new ErrorObservable(postLoginObjectFailure).map(response => response);
    }
  },
};
