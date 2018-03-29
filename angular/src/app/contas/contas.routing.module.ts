import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContaLoginComponent } from './conta-login/conta-login.component';
import { ContaRegistrarComponent } from './conta-registrar/conta-registrar.component';
import { ContaEsqueceuComponent } from './conta-esqueceu/conta-esqueceu.component';

const routes: Routes = [
    { path: '', children: [
        { path: 'login', component: ContaLoginComponent },
        { path: 'registrar', component: ContaRegistrarComponent },
        { path: 'esqueceu_senha', component: ContaEsqueceuComponent },
        { path: ':404', redirectTo: '', pathMatch: 'full' },
    ] },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ContasRoutingModule {}
