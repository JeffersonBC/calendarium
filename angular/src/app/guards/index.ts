import { AuthGuard } from './auth.guard';
import { AuthResolver } from './auth.resolver';
import {
    EventosProximosResolver,
    NomeUsuarioResolver
} from './eventos-proximos.resolver';


export const guards = [
    AuthGuard,
    AuthResolver,
    EventosProximosResolver,
    NomeUsuarioResolver,
];
