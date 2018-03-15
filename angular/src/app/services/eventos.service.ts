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

    postAdicionarEvento(evento: Evento) {
        return this.http.post(
            'http://localhost:8000/api/events/add/',
            JSON.stringify(evento),
            this.httpOptions
        )
            .map(response => response);
    }

    postListarEventosInscrito(mes: number, ano: number) {
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
}
