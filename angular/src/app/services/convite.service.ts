import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { Evento } from '../eventos/models/evento.model';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';


@Injectable()
export class ConviteService {

    private emitMudancaQtdConvites = new Subject<any>();
    public emitirQuantidade$ = this.emitMudancaQtdConvites.asObservable();

    constructor(private httpService: HttpService) { }

    public emitirMudancaQtd(quantidade: number) {
        this.emitMudancaQtdConvites.next(quantidade);
    }

    public getConviteDetalhesEvento(id: number) {
        return this.httpService.get(environment.backendUrl + `:8000/api/events/invite/${id}/`)
            .map(response => response['msg']);
    }

    public getConviteListar() {
        return this.httpService.get(environment.backendUrl + ':8000/api/events/invitations/')
            .map(response => response['msg']);
    }

    public postConviteAdicionar(ids_usuario: string, evento: number) {
        const objeto: any = {
            user: ids_usuario,
            event: evento
        };

        return this.httpService.post(environment.backendUrl + `:8000/api/events/invite/${evento}/add/`, objeto)
            .map(response => response);
    }

    public postConviteAceitar(convite: number) {
        return this.httpService.post(environment.backendUrl + `:8000/api/events/invitations/accept/${convite}/`, {})
            .map(response => response);
    }

    public postConviteRejeitar(convite: number) {
        return this.httpService.post(environment.backendUrl + `:8000/api/events/invitations/reject/${convite}/`, {})
            .map(response => response);
    }

    public postConviteCancelar(convite: number) {
        return this.httpService.post(environment.backendUrl + `:8000/api/events/invitations/cancel/${convite}/`, {})
            .map(response => response);
    }

    public getConviteQuantidade() {
        return this.httpService.get(environment.backendUrl + `:8000/api/events/invitations/count/`)
            .map(response => response);
    }
}
