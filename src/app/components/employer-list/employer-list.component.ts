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
  searchText: any;
  showSpinner: boolean = true;
  p: number = 1;
  id: number;
  editedEmployer: Employer;
  editMode = false;
  employerForm: FormGroup;
  formModal: any;
  employers: Employer[] = [
    // {
    //   id: 1,
    //   name: 'Med',
    //   email: 'graristar@gmail.com',
    //   phoneNumber: '+21653536001',
    //   position: 'MANAGER',
    //   status: 'ON',
    //   contractType: 'CDI',
    //   endContract: '2022-08-29',
    //   birthday: '1996-09-30',
    //   hireDate: '2022-01-01',
    // },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private employerService: EmployerService
  ) {}

  ngOnInit(): void {
    this.employerService.get().subscribe((emp: Employer[]) => {
      if (emp) {
        this.showSpinner = false;
      }
      this.employers = emp;
    });
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
    this.initForm();
  }
  onHide() {
    this.formModal.hide();
    this.editMode = false;
  }
  onDelete(employer: Employer) {
    this.employerService.delete(employer).subscribe(() => {
      this.employers.splice(this.employers.indexOf(employer), 1);
    });
  }
  openFormModal() {
    this.initForm();
    // this.employerForm.reset();
    this.formModal.show();
  }
  saveSomeThing() {
    if (this.editMode) {
      this.employerService.handler(this.employerForm, this.id);
      this.employerService.update().subscribe((emp: Employer) => {
        if (emp) {
          this.showSpinner = false;
        }
        this.employers.splice(
          this.employers.indexOf(this.editedEmployer),
          1,
          emp
        );
      });
    } else {
      this.employerService.handler(this.employerForm);
      this.employerService.create().subscribe((emp: Employer) => {
        if (emp) {
          this.showSpinner = false;
        }
        this.employers.splice(0, 0, emp);
      });
    }
    this.onHide();
  }

  onEdit(employer: Employer) {
    this.editMode = true;
    this.id = employer.id;
    this.editedEmployer = employer;
    this.initForm();
    this.formModal.show();
  }
  initForm() {
    if (this.editMode) {
      console.log('edit mode');
      let employer = this.editedEmployer;
      this.employerForm = this.formBuilder.group({
        name: [employer.name, Validators.required],
        email: [employer.email, [Validators.required, Validators.email]],
        phoneNumber: [employer.phoneNumber, Validators.required],
        position: [employer.position, Validators.required],
        status: [employer.status, Validators.required],
        contractType: [employer.contractType, Validators.required],
        hireDate: [employer.hireDate, Validators.required],
        endContract: [employer.endContract],
        birthday: [employer.birthday, Validators.required],
      });
    } else {
      console.log('add mode');
      this.employerForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', Validators.required],
        position: ['', Validators.required],
        status: ['', Validators.required],
        contractType: ['', Validators.required],
        hireDate: ['', Validators.required],
        endContract: [''],
        birthday: ['', Validators.required],
      });
    }
  }
}
