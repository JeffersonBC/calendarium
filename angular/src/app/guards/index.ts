import { AuthGuard } from './auth.guard';
import { EventosProximosResolver } from './eventos-proximos.resolver';


export const guards = [
    AuthGuard,
    EventosProximosResolver,
];
