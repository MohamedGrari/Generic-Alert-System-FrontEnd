import { Component, OnInit } from '@angular/core';
import { Employer } from 'src/app/models/employer.model';
declare var window: any;
@Component({
  selector: 'app-employer-list',
  templateUrl: './employer-list.component.html',
  styleUrls: ['./employer-list.component.css'],
})
export class EmployerListComponent implements OnInit {
  formModal: any;
  employers: Employer[] = [
    {
      id: 1,
      name: 'Med',
      email: 'graristar@gmail.com',
      phoneNumber: '+21653536001',
      position: 'MANAGER',
      status: 'ON',
      contractType: 'CDI',
      endContract: '2022-08-29',
      birthday: '1996-09-30',
      hireDate: '2022-01-01',
    },
  ];
  constructor() {}

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
  }
  onDelete() {}
  openFormModal() {
    this.formModal.show();
  }
  saveSomeThing() {
    // confirm or save something
    this.formModal.hide();
  }
}
