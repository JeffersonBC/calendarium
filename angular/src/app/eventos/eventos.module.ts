import { MaterializeModule } from 'angular2-materialize';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EventosRoutingModule } from './eventos.routing.module';

import { EventosComponent } from './eventos.component';
import { EventosConvitesComponent } from './eventos-convites/eventos-convites.component';
import { EventosEditarComponent } from './eventos-editar/eventos-editar.component';
import { EventosConvidarComponent } from './eventos-convidar/eventos-convidar.component';


@NgModule({
  imports: [
    MaterializeModule,
    CommonModule,
    FormsModule,
    EventosRoutingModule,
  ],
  declarations: [
    EventosComponent,
    EventosConvitesComponent,
    EventosEditarComponent,
    EventosConvidarComponent
  ]
})
export class EventosModule { }
