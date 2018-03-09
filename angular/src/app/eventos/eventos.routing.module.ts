import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventosComponent } from './eventos.component';
import { EventosAdicionarComponent } from './eventos-adicionar/eventos-adicionar.component';
import { EventosEditarComponent } from './eventos-editar/eventos-editar.component';
import { EventosConvitesComponent } from './eventos-convites/eventos-convites.component';


const routes: Routes = [
    { path: '', component: EventosComponent},
    { path: 'adicionar', component: EventosAdicionarComponent },
    { path: 'editar/:id', component: EventosEditarComponent },
    { path: 'convites', component: EventosConvitesComponent },
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
