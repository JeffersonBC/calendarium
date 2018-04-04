import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { AuthGuard } from './guards/auth.guard';
import { EventosProximosResolver } from './guards/eventos-proximos.resolver';

const appRoutes: Routes = [
    { path: '', component: HomeComponent,
        resolve: { proximos: EventosProximosResolver } },
    { path: 'conta', loadChildren: 'app/contas/contas.module#ContasModule' },
    { path: 'eventos',
        loadChildren: 'app/eventos/eventos.module#EventosModule',
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
    },
    { path: ':404', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
