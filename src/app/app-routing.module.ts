import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAlertFormComponent } from './components/add-alert-form/add-alert-form.component';
import { AlertListComponent } from './components/alert-list/alert-list.component';
import { EmployerAddComponent } from './components/employer-add/employer-add.component';
import { EmployerListComponent } from './components/employer-list/employer-list.component';
import { JobListComponent } from './components/job-list/job-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/alerts', pathMatch: 'full' },
  { path: 'alerts', component: AlertListComponent},
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
  },
  { path: 'alerts/:id/edit', component: AddAlertFormComponent },
  { path: 'jobs', component: JobListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
