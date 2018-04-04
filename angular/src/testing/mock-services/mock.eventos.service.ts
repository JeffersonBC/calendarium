import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import {
  getEventosAnoObject,
  getEventosProximosObject,
  getEventoObject,
} from '../mock-objects/mock.eventos.objects';
import { Evento } from '../../app/eventos/models/evento.model';

export const MockEventosService = {

  /* EventosComponent */
  getEventosAno(ano: number) {
    return Observable.of(getEventosAnoObject).map(response => response);
  },

  /* HomeComponent */
  getEventosProximos(quantidade: number) {
    return Observable.of(getEventosProximosObject).map(response => response);
  },

  /* EventosEditarComponent */
  getEvento(evento_id: number) {
    return Observable.of(getEventoObject).map(response => response);
  },

  postEventoAdicionar(evento: Evento) {
    return Observable.of({'success': true, 'msg': 'Evento criado com sucesso.'})
      .map(response => response);
  },

  postEventoAtualizar(evento: Evento) {
    return Observable.of({'success': true, 'msg': 'Evento atualizado com sucesso.'})
      .map(response => response);
  },

  postEventoDeletar(evento_id: number) {
    return Observable.of({'success': true, 'msg': 'Evento deletado com sucesso.'})
      .map(response => response);
  },

};
