import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import {
  getEventosAnoObject,
  getEventosProximosObject,
} from '../mock-objects/mock.eventos.objects';

export const MockEventosService = {

  getEventosAno(ano: number) {
    return Observable.of(getEventosAnoObject).map(response => response);
  },

  getEventosProximos(quantidade: number) {
    return Observable.of(getEventosProximosObject).map(response => response);
  }

};
