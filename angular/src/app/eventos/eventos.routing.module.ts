import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventosComponent } from './eventos.component';
import { EventosEditarComponent } from './eventos-editar/eventos-editar.component';
import { EventosConvitesComponent } from './eventos-convites/eventos-convites.component';
import { EventosConvidarComponent } from './eventos-convidar/eventos-convidar.component';

import { EventosResolver } from '../guards/eventos.resolver';


const routes: Routes = [
    { path: '', component: EventosComponent,
        resolve: { listaEventos: EventosResolver }
    },
    { path: 'adicionar', component: EventosEditarComponent },
    { path: 'editar/:id', component: EventosEditarComponent },
    { path: 'convites', component: EventosConvitesComponent },
    { path: 'convidar/:id', component: EventosConvidarComponent },
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
