// IMPORT DE HTTP PRECISA VIR ANTES DOS SERVIÇOS DE CONTAS, CONVITES, EVENTOS E CACHE
import { HttpService } from './http.service';

import { CacheEventosService } from './cache-eventos.service';
import { ContasService } from './contas.service';
import { ConviteService } from './convite.service';
import { EventosService } from './eventos.service';

import { DataAtualService } from './data-atual.service';
import { FormService } from './form.service';
import { LoginEmitService } from './login-emit.service';


export const services = [
    CacheEventosService,
    ContasService,
    ConviteService,
    DataAtualService,
    EventosService,
    FormService,
    HttpService,
    LoginEmitService,
];
