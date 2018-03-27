import { MaterializeModule } from 'angular2-materialize';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Page404Component } from './page404/page404.component';

import { AppRoutingModule } from './app.routing.module';

import { LoggedInInterceptor } from './interceptors/loggedin.interceptor';

import { services } from './services';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Page404Component,
  ],
  imports: [
    MaterializeModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ...services,
    { provide: HTTP_INTERCEPTORS, useClass: LoggedInInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
