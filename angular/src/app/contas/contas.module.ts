import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContasRoutingModule } from './contas.routing.module';

import { ContaRegistrarComponent } from './conta-registrar/conta-registrar.component';
import { ContaLoginComponent } from './conta-login/conta-login.component';


@NgModule({
  imports: [
    CommonModule,
    ContasRoutingModule,
  ],
  declarations: [
    ContaRegistrarComponent,
    ContaLoginComponent,
  ]
})
export class ContasModule { }
