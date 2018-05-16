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
        return this.httpService.post(environment.backendUrl + '/api/events/add/', evento);
    }

    public postEventoDeletar(evento_id: number) {
        return this.httpService.post(environment.backendUrl + `/api/events/delete/${evento_id}/`, {});
    }

    public getEvento(evento_id: number) {
        return this.httpService.get(environment.backendUrl + `/api/events/get/${evento_id}/`);
    }

    public postEventoAtualizar(evento: Evento, evento_id: number) {
        return this.httpService.post(environment.backendUrl + `/api/events/update/${evento_id}/`, evento);
    }

    public getEventosAno(ano: number) {
        return this.httpService.get(environment.backendUrl + `/api/events/get_by_date/${ano}/`);
    }

    public getEventosMes(ano: number, mes: number) {
        return this.httpService.get(environment.backendUrl + `/api/events/get_by_date/${ano}/${mes}/`);
    }

    public getEventosProximos(quantidade: number) {
        return this.httpService.get(environment.backendUrl + `/api/events/get_next/${quantidade}/`);
    }

}
