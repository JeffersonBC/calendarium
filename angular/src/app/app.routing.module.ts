import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContasComponent } from './contas/contas.component';
import { EventosComponent } from './eventos/eventos.component';

const appRoutes: Routes = [
    { path: 'contas', component: ContasComponent },
    { path: 'eventos', component: EventosComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
