import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Employer } from 'src/app/models/employer.model';
import { EmployerService } from 'src/app/services/employer.service';
import { EmployerItemComponent } from '../employer-item/employer-item.component';
declare var window: any;
@Component({
  selector: 'app-employer-list',
  templateUrl: './employer-list.component.html',
  styleUrls: ['./employer-list.component.css'],
})
export class EmployerListComponent implements OnInit {
  editedEmployer: Employer;
  editMode = false;
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
  constructor(
    private formBuilder: FormBuilder,
    private employerService: EmployerService
  ) {}

  ngOnInit(): void {
    this.employerService.get().subscribe((emp: Employer[]) => {
      this.employers = emp;
    })
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
    this.initForm();
  }
  onDelete(employer: Employer) {
    this.employerService.delete(employer).subscribe(
      () => {
        this.employers.splice(this.employers.indexOf(employer), 1);
      }
    )
  }
  openFormModal() {
    this.employerForm.reset();
    this.formModal.show();
  }
  saveSomeThing() {
    if (this.editMode) {
      this.employerService.update().subscribe((emp: Employer) => {
        this.employers.splice(this.employers.indexOf(this.editedEmployer),1,emp)
      });
    } else {
      this.employerService.create().subscribe((emp: Employer) => {
        this.employers.push(emp)
      })
    }
    console.log(this.employerForm);
    this.formModal.hide();
  }

  onEdit(employer: Employer) {
    this.formModal.show();
    this.editMode = true;
    this.editedEmployer = employer;
    this.initForm();
  }
  initForm() {
    if (this.editMode) {
      let employer = this.editedEmployer;
      this.employerForm = this.formBuilder.group({
        name: [employer.name, Validators.required],
        email: [employer.email, Validators.required],
        phoneNumber: [employer.phoneNumber, Validators.required],
        position: [employer.position, Validators.required],
        status: [employer.status, Validators.required],
        contractType: [employer.contractType, Validators.required],
        hireDate: [employer.hireDate, Validators.required],
        endContract: [employer.endContract, Validators.required],
        birthday: [employer.birthday, Validators.required],
      });
    } else {
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
      });
    }
  }
}
