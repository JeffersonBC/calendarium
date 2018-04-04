import {
    EventosConvidarResolver,
    EventosConvitesResolver,
    EventosDetalhesResolver,
    EventosListaResolver,
} from '.';

export const eventosGuards = [
    EventosConvidarResolver,
    EventosConvitesResolver,
    EventosDetalhesResolver,
    EventosListaResolver,
];
