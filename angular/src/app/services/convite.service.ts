import { Injectable } from '@angular/core';

import { Observable ,  Subject } from 'rxjs';
import { map } from 'rxjs/operators';

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
        return this.httpService.get(environment.backendUrl + `/api/events/invite/${id}/`);
    }

    public getConviteListar() {
        return this.httpService.get(environment.backendUrl + '/api/events/invitations/');
    }

    public postConviteAdicionar(ids_usuario: string, evento: number) {
        const objeto: any = {
            user: ids_usuario,
            event: evento
        };

        return this.httpService.post(environment.backendUrl + `/api/events/invite/${evento}/add/`, objeto)
            .pipe(map(response => response));
    }

    public postConviteAceitar(convite: number) {
        return this.httpService.post(environment.backendUrl + `/api/events/invitations/accept/${convite}/`, {})
            .pipe(map(response => response));
    }

    public postConviteRejeitar(convite: number) {
        return this.httpService.post(environment.backendUrl + `/api/events/invitations/reject/${convite}/`, {})
            .pipe(map(response => response));
    }

    public postConviteCancelar(convite: number) {
        return this.httpService.post(environment.backendUrl + `/api/events/invitations/cancel/${convite}/`, {})
            .pipe(map(response => response));
    }

    public getConviteQuantidade() {
        return this.httpService.get(environment.backendUrl + `/api/events/invitations/count/`)
            .pipe(map(response => response));
    }
}
