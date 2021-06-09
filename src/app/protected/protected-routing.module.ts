import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CargafacturasComponent } from './cargafacturas/cargafacturas.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children:[
      {path: 'dashboard', component: DashboardComponent,},
      {path: 'facturas', component: CargafacturasComponent,},
      {path: '**', redirectTo: ''}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
