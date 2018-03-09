import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContaLoginComponent } from './conta-login/conta-login.component';
import { ContaRegistrarComponent } from './conta-registrar/conta-registrar.component';

const routes: Routes = [
    { path: '', children: [
        { path: 'login', component: ContaLoginComponent },
        { path: 'registrar', component: ContaRegistrarComponent },
    ] },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ContasRoutingModule {}
