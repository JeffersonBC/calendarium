import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { getUsuarioLogado } from '../mock-objects/mock.contas.objects';


export const MockContasService = {
  getUsuarioLogado() {
    return Observable.of(getUsuarioLogado).map(response => response);
  }
};
