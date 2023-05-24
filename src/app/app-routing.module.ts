import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthCheckComponent } from './utils/health-check/health-check.component';
import { GenericTableComponent } from './generic-table/generic-table.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [

  {
    path: '',
    redirectTo: 'panel-dashboard',
    pathMatch: 'full'
  },
  {
    path: 'status',
    component: HealthCheckComponent
  },
  {
    path: 'panel-dashboard',
    component: DashboardComponent,
  },
  {
    path: 'generic-table',
    component: GenericTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }