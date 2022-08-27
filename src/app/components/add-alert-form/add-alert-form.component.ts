import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertForm } from '../../models/alert-form.model';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-add-alert-form',
  templateUrl: './add-alert-form.component.html',
  styleUrls: ['./add-alert-form.component.css'],
})
export class AddAlertFormComponent implements OnInit {
  alertSubject!: FormGroup;
  alertTrigger!: FormGroup;
  alertDestination!: FormGroup;
  personal_step = false;
  address_step = false;
  education_step = false;
  step = 1;

  entity$ = 'employer';
  entityTarget$ = 'ALL';
  entityCriteria$ = 'null';
  entityCriteriaStatusValue$ = 'null';
  entityCriteriaPositionValue$ = 'null';
  entityCriteriaContractTypeValue$ = 'null';
  attribute$ = 'null';
  wantedAttributeValue$ = 'null';
  atValue = 'AT';
  consoleValue = 'CONSOLE';
  destination$ = 'ALL';
  destinationValue$ = 'null';
  destinationCriteria$ = 'null';

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.alertSubject = this.formBuilder.group({
      entity: [''],
      entityTarget: [''],
      entityCriteria: ['', Validators.required],
      entityCriteriaValue: ['', Validators.required],
    });

    this.alertTrigger = this.formBuilder.group({
      update: ['', Validators.required],
      attribute: ['', Validators.required],
      wantedAttributeValue: ['', Validators.required],
      dayNumber: ['0',[Validators.pattern(/^$|^[0-9]+[0-9]*$/), Validators.required]],
    });

    this.alertDestination = this.formBuilder.group({
      alertMode: ['', Validators.required],
      destination: ['', Validators.required],
      destinationCriteria: ['', Validators.required],
      destinationValue: ['', Validators.required],
      text: ['', Validators.required],
    });
  }

  // get personal() {
  //   return this.alertSubject.controls;
  // }

  // get address() {
  //   return this.alertTrigger.controls;
  // }

  // get education() {
  //   return this.alertDestination.controls;
  // }
  next() {
    if (this.step == 1) {
      this.personal_step = true;
      // if (this.alertSubject.invalid) {
      //   return;
      // }
      this.step++;
    } else if (this.step == 2) {
      this.address_step = true;
      // if (this.alertTrigger.invalid) {
      //   return;
      // }
      this.step++;
    }
  }

  previous() {
    this.step--;

    if (this.step == 1) {
      this.address_step = false;
    }
    if (this.step == 2) {
      this.education_step = false;
    }
  }

  onSubmit() {
    this.alertService.handler(
      this.alertSubject,
      this.alertTrigger,
      this.alertDestination
    );
    this.alertService.create().subscribe(
      (alertForm: AlertForm) => {
        console.log(alertForm);
      });
  }
  submit() {
    if (this.step == 3) {
      this.education_step = true;
      if (this.alertDestination.invalid) {
        return;
      }
      alert('Well done!!');
    }
  }

  onClick() {
    console.log(this.alertSubject);
    console.log(this.alertTrigger);
    console.log(this.alertDestination);
  }
}
