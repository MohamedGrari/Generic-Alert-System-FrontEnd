import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Employer } from '../models/employer.model';

const baseUrl = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root',
})
export class EmployerService {
  employer = new Employer();

  constructor(private http: HttpClient) {}

  handler(employerForm: FormGroup) {
    this.employer.name = employerForm.value.name;
    this.employer.email = employerForm.value.email;
    this.employer.phoneNumber = employerForm.value.phoneNumber;
    this.employer.position = employerForm.value.position;
    this.employer.status = employerForm.value.status;
    this.employer.contractType = employerForm.value.contractType;
    this.employer.hireDate = employerForm.value.hireDate;
    this.employer.endContract = employerForm.value.endContract;
    this.employer.birthday = employerForm.value.birthday;
  }

  create(): Observable<Employer> {
    console.log(this.employer);
    return this.http.post<Employer>(baseUrl + 'saveEmployer', this.employer);
  }
}
