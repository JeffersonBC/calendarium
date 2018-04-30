import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRootComponent } from './app-root/app-root.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './guards/auth.guard';
import { AuthResolver } from './guards/auth.resolver';
import { EventosProximosResolver, NomeUsuarioResolver } from './guards/eventos-proximos.resolver';


const appRoutes: Routes = [
    { path: '', component: AppRootComponent,
        resolve: { isLogged: AuthResolver },
        children: [
            { path: '', component: HomeComponent,
                resolve: {
                    proximos: EventosProximosResolver,
                    usuario: NomeUsuarioResolver,
                },
            },
            { path: 'conta', loadChildren: 'app/contas/contas.module#ContasModule' },
            { path: 'eventos',
                loadChildren: 'app/eventos/eventos.module#EventosModule',
                canActivate: [AuthGuard],
                canLoad: [AuthGuard],
            },
            { path: ':404', redirectTo: '', pathMatch: 'full' },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
