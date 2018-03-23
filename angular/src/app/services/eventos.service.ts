import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Evento } from '../eventos/models/evento.model';
import { HttpService } from './http.service';



@Injectable()
export class EventosService {

    constructor(private httpService: HttpService) { }

    public postEventoAdicionar(evento: Evento) {
        return this.httpService.post('http://localhost:8000/api/events/add/', evento)
            .map(response => response);
    }

    public postEventoDeletar(evento_id: number) {
        return this.httpService.post(`http://localhost:8000/api/events/delete/${evento_id}/`, {})
            .map(response => response);
    }

    public getEvento(evento_id: number) {
        return this.httpService.get(`http://localhost:8000/api/events/get/${evento_id}/`)
            .map(response => response);
    }

    public postEventoAtualizar(evento: Evento, evento_id: number) {
        return this.httpService.post(`http://localhost:8000/api/events/update/${evento_id}/`, evento)
            .map(response => response);
    }

    public getEventoPorData(ano: number) {

        return this.httpService.get(`http://localhost:8000/api/events/get_by_date/${ano}/`)
            .map(response => response);
    }

}
