import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Evento } from '../eventos/models/evento.model';



@Injectable()
export class EventosService {

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    public postAdicionarEvento(evento: Evento) {
        return this.http.post(
            'http://localhost:8000/api/events/add/',
            JSON.stringify(evento),
            this.httpOptions
        )
            .map(response => response);
    }

    public postListarEventosInscrito(mes: number, ano: number) {
        return this.http.post(
            'http://localhost:8000/api/events/get_by_date/',
            JSON.stringify({
                month: mes,
                year: ano
            }),
            this.httpOptions
        )
            .map(response => response['msg']);
    }

    public getDetalhesEventoConvite(id: number) {
        return this.http.get(
            `http://localhost:8000/api/events/invite/${id}/`,
            this.httpOptions
        )
            .map(response => response['msg']);
    }

    public postAdicionarConvite(ids_usuario: string, evento: number) {
        return this.http.post(
            `http://localhost:8000/api/events/invite/${evento}/add/`,
            JSON.stringify({
                user: ids_usuario,
                event: evento
            }),
            this.httpOptions
        )
            .map(response => response);
    }

    public getListarEventosConvidado() {
        return this.http.get(
            `http://localhost:8000/api/events/invitations/`,
            this.httpOptions
        )
            .map(response => response['msg']);
    }

    public postAceitarConvite(convite: number) {
        return this.http.post(
            `http://localhost:8000/api/events/invitations/accept/${convite}/`,
            JSON.stringify({}),
            this.httpOptions
        )
            .map(response => response);
    }

    public postRejeitarConvite(convite: number) {
        return this.http.post(
            `http://localhost:8000/api/events/invitations/reject/${convite}/`,
            JSON.stringify({}),
            this.httpOptions
        )
            .map(response => response);
    }

    public postCancelarConvite(convite: number) {
        return this.http.post(
            `http://localhost:8000/api/events/invitations/cancel/${convite}/`,
            JSON.stringify({}),
            this.httpOptions
        )
            .map(response => response);
    }
}
