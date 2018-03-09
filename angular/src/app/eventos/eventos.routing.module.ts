import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventosComponent } from './eventos.component';
import { EventosEditarComponent } from './eventos-editar/eventos-editar.component';
import { EventosConvitesComponent } from './eventos-convites/eventos-convites.component';
import { EventosConvidarComponent } from './eventos-convidar/eventos-convidar.component';


const routes: Routes = [
    { path: '', component: EventosComponent},
    { path: 'adicionar', component: EventosEditarComponent },
    { path: 'editar/:id', component: EventosEditarComponent },
    { path: 'convites', component: EventosConvitesComponent },
    { path: 'convidar', component: EventosConvidarComponent },
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
