import { MaterializeModule } from 'angular2-materialize';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Page404Component } from './page404/page404.component';

import { AppRoutingModule } from './app.routing.module';

import { LoginEmitService } from './login-emit.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Page404Component,
  ],
  imports: [
    MaterializeModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    LoginEmitService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
