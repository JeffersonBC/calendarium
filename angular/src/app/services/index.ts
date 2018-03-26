// IMPORT DE HTTP PRECISA VIR ANTES DOS SERVIÇOS DE CONTAS, CONVITES, EVENTOS E CACHE
import { HttpService } from './http.service';

import { FormService } from './form.service';
import { LoginEmitService } from './login-emit.service';

import { ContasService } from './contas.service';
import { ConviteService } from './convite.service';
import { EventosService } from './eventos.service';
import { CacheEventosService } from './cache-eventos.service';


export const services = [
    CacheEventosService,
    ContasService,
    ConviteService,
    EventosService,
    FormService,
    HttpService,
    LoginEmitService,
];
