// IMPORT DE HTTP PRECISA VIR ANTES DOS SERVIÇOS DE CONTAS, CONVITES E EVENTOS
import { HttpService } from './http.service';

import { FormService } from './form.service';
import { LoginEmitService } from './login-emit.service';

import { ContasService } from './contas.service';
import { ConviteService } from './convite.service';
import { EventosService } from './eventos.service';



export const services = [
    ContasService,
    ConviteService,
    EventosService,
    FormService,
    HttpService,
    LoginEmitService,
];
