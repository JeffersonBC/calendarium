import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventosComponent } from './eventos.component';
import { EventosEditarComponent } from './eventos-editar/eventos-editar.component';
import { EventosConvitesComponent } from './eventos-convites/eventos-convites.component';
import { EventosConvidarComponent } from './eventos-convidar/eventos-convidar.component';

import {
    EventosListaResolver,
    EventosDetalhesResolver,
    EventosConvitesResolver,
    EventosConvidarResolver
} from './guards';


const routes: Routes = [
    { path: '', component: EventosComponent,
        resolve: { listaEventos: EventosListaResolver }
    },
    { path: 'adicionar', component: EventosEditarComponent },
    { path: 'editar/:id', component: EventosEditarComponent ,
        resolve: { evento: EventosDetalhesResolver }
    },
    { path: 'convites', component: EventosConvitesComponent,
        resolve: { convites: EventosConvitesResolver } },
    { path: 'convidar/:id', component: EventosConvidarComponent,
        resolve: { evento: EventosConvidarResolver}
    },
    { path: ':404', redirectTo: '', pathMatch: 'full' },
];


@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class EventosRoutingModule {}
