import { of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  getUsuarioLogadoObject,
  postLoginObject,
  postLoginObjectFailure,
} from '../mock-objects/mock.contas.objects';

import { Login } from '../../app/contas/models/usuario.model';


export const MockContasService = {
  getUsuarioLogado() {
    return of(getUsuarioLogadoObject).pipe(map(response => response));
  },

  postLogin(login_info: Login) {
    if (login_info.username === 'Teste' && login_info.password === 'a12345678') {
      return of(postLoginObject).pipe(map(response => response));

    } else {
      return throwError(postLoginObjectFailure).pipe(map(response => response));
    }
  },
};
