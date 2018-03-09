import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContaRegistrarComponent } from './conta-registrar/conta-registrar.component';
import { ContaLoginComponent } from './conta-login/conta-login.component';
import { ContasRoutingModule } from './contas.routing.module';

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
