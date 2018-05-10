import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Evento } from '../eventos/models/evento.model';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';


@Injectable()
export class EventosService {

    constructor(private httpService: HttpService) { }

    public postEventoAdicionar(evento: Evento) {
        return this.httpService.post(environment.backendUrl + '/api/events/add/', evento)
            .pipe(map(response => response));
    }

    public postEventoDeletar(evento_id: number) {
        return this.httpService.post(environment.backendUrl + `/api/events/delete/${evento_id}/`, {})
            .pipe(map(response => response));
    }

    public getEvento(evento_id: number) {
        return this.httpService.get(environment.backendUrl + `/api/events/get/${evento_id}/`)
            .pipe(map(response => response));
    }

    public postEventoAtualizar(evento: Evento, evento_id: number) {
        return this.httpService.post(environment.backendUrl + `/api/events/update/${evento_id}/`, evento)
            .pipe(map(response => response));
    }

    public getEventosAno(ano: number) {
        return this.httpService.get(environment.backendUrl + `/api/events/get_by_date/${ano}/`)
            .pipe(map(response => response));
    }

    public getEventosMes(ano: number, mes: number) {
        return this.httpService.get(environment.backendUrl + `/api/events/get_by_date/${ano}/${mes}/`)
            .pipe(map(response => response));
    }

    public getEventosProximos(quantidade: number) {
        return this.httpService.get(environment.backendUrl + `/api/events/get_next/${quantidade}/`)
            .pipe(map(response => response));
    }

}
