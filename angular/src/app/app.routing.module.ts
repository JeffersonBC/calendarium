import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { Page404Component } from './page404/page404.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'conta', loadChildren: 'app/contas/contas.module#ContasModule' },
    { path: 'eventos', loadChildren: 'app/eventos/eventos.module#EventosModule' },
    { path: ':404', component: Page404Component },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
