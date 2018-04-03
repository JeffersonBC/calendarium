import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import {
  getConviteDetalhesEventoObject,
  postConviteAdicionarObject,
  getConviteListarObject,
} from '../mock-objects/mock.convite.objects';
import { Subject } from 'rxjs/Subject';


export const MockConviteService = {

  /* Eventos Convidar */
  getConviteDetalhesEvento: (id: number) => {
    return Observable.of(getConviteDetalhesEventoObject).map(response => response);
  },

  postConviteAdicionar: (ids_usuario: string, evento: number) => {
    return Observable.of(getConviteDetalhesEventoObject).map(response => response);
  },

  /* Eventos Convites */
  getConviteListar: () => {
    return Observable.of(getConviteListarObject).map(response => response['msg']);
  },

  /* Eventos Lista */
  postConviteAceitar(convite: number) {
    return Observable.of({ 'success': true, 'msg': 'Inscrição no evento confirmada' })
      .map(response => response);
  },

  postConviteRejeitar(convite: number) {
    return Observable.of({ 'success': true, 'msg': 'Convite recusado com sucesso.' })
      .map(response => response);
  },

  postConviteCancelar(convite: number) {
    return Observable.of({ 'success': true, 'msg': 'Inscrição cancelada com sucesso.' })
      .map(response => response);
  },

  /* App Component */
  emitMudancaQtdConvites: new Subject<any>(),
  get emitirQuantidade$() { return this.emitMudancaQtdConvites.asObservable(); },

  emitirMudancaQtd(quantidade: number) {
    this.emitMudancaQtdConvites.next(quantidade);
  },

  getConviteQuantidade() {
    return Observable.of({ 'success': true, 'msg': { 'count': 2 } })
      .map(response => response);
  },
};
