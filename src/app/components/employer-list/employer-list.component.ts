import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employer } from 'src/app/models/employer.model';
declare var window: any;
@Component({
  selector: 'app-employer-list',
  templateUrl: './employer-list.component.html',
  styleUrls: ['./employer-list.component.css'],
})
export class EmployerListComponent implements OnInit {
  employerForm: FormGroup;
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
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
    this.employerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      position: ['', Validators.required],
      status: ['', Validators.required],
      contractType: ['', Validators.required],
      hireDate: ['', Validators.required],
      endContract: ['', Validators.required],
      birthday: ['', Validators.required],
    })
  }
  onDelete() {}
  openFormModal() {
    this.formModal.show();
  }
  saveSomeThing() {
    // confirm or save something
    console.log(this.employerForm);
    this.formModal.hide();
  }
}
