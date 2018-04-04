import { EventosDetalhesResolver } from './eventos-detalhes.resolver';
import { EventosListaResolver } from './eventos-lista.resolver';

export const eventosGuards = [
    EventosDetalhesResolver,
    EventosListaResolver,
];
