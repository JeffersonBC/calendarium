import { MaterializeModule } from 'angular2-materialize';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { AppRootComponent } from './app-root/app-root.component';
import { HomeComponent } from './home/home.component';

import { AppRoutingModule } from './app.routing.module';

import { LoggedInInterceptor } from './interceptors/loggedin.interceptor';

import { guards } from './guards';
import { services } from './services';

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { environment } from '../environments/environment';
registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    AppRootComponent,
    HomeComponent,
  ],
  imports: [
    MaterializeModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    ...guards,
    ...services,

    { provide: HTTP_INTERCEPTORS, useClass: LoggedInInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
