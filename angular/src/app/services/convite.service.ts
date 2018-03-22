import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Evento } from '../eventos/models/evento.model';
import { HttpService } from './http.service';



@Injectable()
export class ConviteService {

    constructor(private httpService: HttpService) { }


    public getConviteDetalhesEvento(id: number) {
        return this.httpService.get(`http://localhost:8000/api/events/invite/${id}/`)
            .map(response => response['msg']);
    }

    public getConviteListar() {
        return this.httpService.get(`http://localhost:8000/api/events/invitations/`)
            .map(response => response['msg']);
    }

    public postConviteAdicionar(ids_usuario: string, evento: number) {
        const objeto: any = {
            user: ids_usuario,
            event: evento
        };

        return this.httpService.post(`http://localhost:8000/api/events/invite/${evento}/add/`, objeto)
            .map(response => response);
    }

    public postConviteAceitar(convite: number) {
        return this.httpService.post(`http://localhost:8000/api/events/invitations/accept/${convite}/`, {})
            .map(response => response);
    }

    public postConviteRejeitar(convite: number) {
        return this.httpService.post(`http://localhost:8000/api/events/invitations/reject/${convite}/`, {})
            .map(response => response);
    }

    public postConviteCancelar(convite: number) {
        return this.httpService.post(`http://localhost:8000/api/events/invitations/cancel/${convite}/`, {})
            .map(response => response);
    }
}
