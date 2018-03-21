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

    public postEventoAdicionar(evento: Evento) {
        return this.post('http://localhost:8000/api/events/add/', evento)
            .map(response => response);
    }

    public postEventoDeletar(evento_id: number) {
        return this.post(`http://localhost:8000/api/events/delete/${evento_id}/`, {})
            .map(response => response);
    }

    public getEvento(evento_id: number) {
        return this.get(`http://localhost:8000/api/events/get/${evento_id}/`)
            .map(response => response);
    }

    public postEventoAtualizar(evento: Evento, evento_id: number) {
        return this.post(`http://localhost:8000/api/events/update/${evento_id}/`, evento)
            .map(response => response);
    }

    public postEventoListar(mes: number, ano: number) {
        const objeto: any = {
            month: mes,
            year: ano
        };

        return this.post('http://localhost:8000/api/events/get_by_date/', objeto)
            .map(response => response['msg']);
    }

}
