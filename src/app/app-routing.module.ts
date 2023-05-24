import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthCheckComponent } from './utils/health-check/health-check.component';
import { GenericTableComponent } from './generic-table/generic-table.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { LoginAuthGuard } from './auth/login-auth.guard';


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
    path: 'login',
    component: LoginComponent,
    canActivate:[LoginAuthGuard]
  },
  {
    path: 'panel-dashboard',
    component: DashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'generic-table',
    component: GenericTableComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }