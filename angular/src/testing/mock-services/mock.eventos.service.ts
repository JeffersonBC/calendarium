import { of } from 'rxjs';
import { map } from 'rxjs/operators';


import {
  getEventosAnoObject,
  getEventosProximosObject,
  getEventoObject,
} from '../mock-objects/mock.eventos.objects';
import { Evento } from '../../app/eventos/models/evento.model';

export const MockEventosService = {

  /* EventosComponent */
  getEventosAno(ano: number) {
    return of(getEventosAnoObject).pipe(map(response => response));
  },

  /* HomeComponent */
  getEventosProximos(quantidade: number) {
    return of(getEventosProximosObject).pipe(map(response => response));
  },

  /* EventosEditarComponent */
  getEvento(evento_id: number) {
    return of(getEventoObject).pipe(map(response => response));
  },

  postEventoAdicionar(evento: Evento) {
    return of({'success': true, 'msg': 'Evento criado com sucesso.'})
      .pipe(map(response => response));
  },

  postEventoAtualizar(evento: Evento) {
    return of({'success': true, 'msg': 'Evento atualizado com sucesso.'})
      .pipe(map(response => response));
  },

  postEventoDeletar(evento_id: number) {
    return of({'success': true, 'msg': 'Evento deletado com sucesso.'})
      .pipe(map(response => response));
  },

};
