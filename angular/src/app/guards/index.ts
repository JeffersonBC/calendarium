import { AuthGuard } from './auth.guard';
import { EventosProximosResolver, NomeUsuarioResolver } from './eventos-proximos.resolver';


export const guards = [
    AuthGuard,
    EventosProximosResolver,
    NomeUsuarioResolver,
];
