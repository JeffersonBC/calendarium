import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventosComponent } from './eventos.component';
import { EventosRoutingModule } from './eventos.routing.module';

import { EventosAdicionarComponent } from './eventos-adicionar/eventos-adicionar.component';
import { EventosConvitesComponent } from './eventos-convites/eventos-convites.component';
import { EventosEditarComponent } from './eventos-editar/eventos-editar.component';


@NgModule({
  imports: [
    CommonModule,
    EventosRoutingModule,
  ],
  declarations: [
    EventosComponent,
    EventosAdicionarComponent,
    EventosConvitesComponent,
    EventosEditarComponent,
  ]
})
export class EventosModule { }
