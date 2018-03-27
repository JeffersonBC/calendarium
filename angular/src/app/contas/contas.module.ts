import { MaterializeModule } from 'angular2-materialize';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContasRoutingModule } from './contas.routing.module';

import { ContaRegistrarComponent } from './conta-registrar/conta-registrar.component';
import { ContaLoginComponent } from './conta-login/conta-login.component';
import { ContaEsqueceuComponent } from './conta-esqueceu/conta-esqueceu.component';


@NgModule({
  imports: [
    MaterializeModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ContasRoutingModule,
  ],
  declarations: [
    ContaRegistrarComponent,
    ContaLoginComponent,
    ContaEsqueceuComponent
  ]
})
export class ContasModule { }
