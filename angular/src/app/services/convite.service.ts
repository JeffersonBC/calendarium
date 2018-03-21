import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Evento } from '../eventos/models/evento.model';



@Injectable()
export class ConviteService {

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    private post(url: string, objeto: any) {
        return this.http.post(
            url,
            JSON.stringify(objeto),
            this.httpOptions
        );
    }

    private get(url: string) {
        return this.http.get(
            url,
            this.httpOptions
        );
    }


    public getConviteDetalhesEvento(id: number) {
        return this.get(`http://localhost:8000/api/events/invite/${id}/`)
            .map(response => response['msg']);
    }

    public getConviteListar() {
        return this.get(`http://localhost:8000/api/events/invitations/`)
            .map(response => response['msg']);
    }

    public postConviteAdicionar(ids_usuario: string, evento: number) {
        const objeto: any = {
            user: ids_usuario,
            event: evento
        };

        return this.post(`http://localhost:8000/api/events/invite/${evento}/add/`, objeto)
            .map(response => response);
    }

    public postConviteAceitar(convite: number) {
        return this.post(`http://localhost:8000/api/events/invitations/accept/${convite}/`, {})
            .map(response => response);
    }

    public postConviteRejeitar(convite: number) {
        return this.post(`http://localhost:8000/api/events/invitations/reject/${convite}/`, {})
            .map(response => response);
    }

    public postConviteCancelar(convite: number) {
        return this.post(`http://localhost:8000/api/events/invitations/cancel/${convite}/`, {})
            .map(response => response);
    }
}
