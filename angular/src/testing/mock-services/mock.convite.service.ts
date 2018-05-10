import { Observable , Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  getConviteDetalhesEventoObject,
  postConviteAdicionarObject,
  getConviteListarObject,
} from '../mock-objects/mock.convite.objects';


export const MockConviteService = {

  /* Eventos Convidar */
  getConviteDetalhesEvento: (id: number) => {
    return of(getConviteDetalhesEventoObject).pipe(map(response => response['msg']));
  },

  postConviteAdicionar: (ids_usuario: string, evento: number) => {
    return of(getConviteDetalhesEventoObject).pipe(map(response => response));
  },

  /* Eventos Convites */
  getConviteListar: () => {
    return of(getConviteListarObject).pipe(map(response => response['msg']));
  },

  /* Eventos Lista */
  postConviteAceitar(convite: number) {
    return of({ 'success': true, 'msg': 'Inscrição no evento confirmada' })
      .pipe(map(response => response));
  },

  postConviteRejeitar(convite: number) {
    return of({ 'success': true, 'msg': 'Convite recusado com sucesso.' })
      .pipe(map(response => response));
  },

  postConviteCancelar(convite: number) {
    return of({ 'success': true, 'msg': 'Inscrição cancelada com sucesso.' })
      .pipe(map(response => response));
  },

  /* App Component */
  emitMudancaQtdConvites: new Subject<any>(),
  get emitirQuantidade$() { return this.emitMudancaQtdConvites.asObservable(); },

  emitirMudancaQtd(quantidade: number) {
    this.emitMudancaQtdConvites.next(quantidade);
  },

  getConviteQuantidade() {
    return of({ 'success': true, 'msg': { 'count': 2 } })
      .pipe(map(response => response));
  },
};
