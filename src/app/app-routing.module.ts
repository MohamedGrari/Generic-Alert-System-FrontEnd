import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAlertFormComponent } from './components/add-alert-form/add-alert-form.component';
import { AlertListComponent } from './components/alert-list/alert-list.component';
import { EmployerAddComponent } from './components/employer-add/employer-add.component';
import { EmployerListComponent } from './components/employer-list/employer-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/alerts', pathMatch: 'full' },
  {
    path: 'alerts',
    component: AlertListComponent,
    children: [{ path: ':id/edit', component: AddAlertFormComponent }],
  },
  {
    path: 'employers',
    component: EmployerListComponent,
    children: [
      { path: ':id/edit', component: EmployerAddComponent },
      { path: ':new', component: EmployerAddComponent },
    ]
  },
  {
    path: 'add-alert', component: AddAlertFormComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
