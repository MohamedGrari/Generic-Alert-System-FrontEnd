import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddAlertFormComponent } from './components/add-alert-form/add-alert-form.component';
import { HeaderComponent } from './components/header/header.component';
import { AlertListComponent } from './components/alert-list/alert-list.component';
import { EmployerListComponent } from './components/employer-list/employer-list.component';
import { AlertItemComponent } from './components/alert-item/alert-item.component';
import { EmployerItemComponent } from './components/employer-item/employer-item.component';
import { EmployerAddComponent } from './components/employer-add/employer-add.component';

@NgModule({
  declarations: [
    AppComponent,
    AddAlertFormComponent,
    HeaderComponent,
    AlertListComponent,
    EmployerListComponent,
    AlertItemComponent,
    EmployerItemComponent,
    EmployerAddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
