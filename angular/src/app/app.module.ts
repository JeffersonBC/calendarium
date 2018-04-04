import { MaterializeModule } from 'angular2-materialize';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { AppRoutingModule } from './app.routing.module';

import { LoggedInInterceptor } from './interceptors/loggedin.interceptor';

import { services } from './services';

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    MaterializeModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ...services,
    { provide: HTTP_INTERCEPTORS, useClass: LoggedInInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
