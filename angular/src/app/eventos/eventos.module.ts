import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterializeModule } from 'angular2-materialize';
import { Select2Module } from 'ng2-select2';

import { EventosRoutingModule } from './eventos.routing.module';

import { EventosComponent } from './eventos.component';
import { EventosConvitesComponent } from './eventos-convites/eventos-convites.component';
import { EventosEditarComponent } from './eventos-editar/eventos-editar.component';
import { EventosConvidarComponent } from './eventos-convidar/eventos-convidar.component';
import { EventosListaComponent } from './eventos-lista/eventos-lista.component';




@NgModule({
  imports: [
    MaterializeModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    EventosRoutingModule,
    Select2Module
  ],
  declarations: [
    EventosComponent,
    EventosConvitesComponent,
    EventosEditarComponent,
    EventosConvidarComponent,
    EventosListaComponent
  ]
})
export class EventosModule { }
