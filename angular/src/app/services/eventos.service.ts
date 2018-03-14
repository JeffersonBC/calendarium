import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Evento } from '../eventos/models/evento.model';



@Injectable()
export class EventosService {

    constructor(private http: HttpClient) { }

    postAdicionarEvento(evento: Evento) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http.post(
            'http://localhost:8000/api/events/add/',
            JSON.stringify(evento),
            httpOptions
        )
            .map(response => response);
    }
}
