import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Employer } from 'src/app/models/employer.model';
import { EmployerService } from 'src/app/services/employer.service';
import { AlertForm } from '../../models/alert-form.model';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-add-alert-form',
  templateUrl: './add-alert-form.component.html',
  styleUrls: ['./add-alert-form.component.css'],
})
export class AddAlertFormComponent implements OnInit {
  editMode = false;
  id: number;
  showSpinner: boolean = false;
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

  employersName: string[] = [];
  employersId: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private employerService : EmployerService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
    this.employerService.get().subscribe(
      (employers: Employer[]) => {
        for (let emp of employers) {
          this.employersName.push(emp.name); 
          this.employersId.push(emp.id);
        }
      }
    )
  }

  initForm() {
    if (this.editMode) {
      let alertForm: AlertForm;
      this.alertService.getById(this.id).subscribe((data: AlertForm) => {
        alertForm = data;
        this.alertSubject = this.formBuilder.group({
          entity: [alertForm.entity],
          entityTarget: [
            alertForm.entityCriteria === 'ALL' ||
            alertForm.entityCriteria === 'ONE'
              ? alertForm.entityCriteria
              : 'null',
          ],
          entityCriteria: [
            alertForm.entityCriteria === 'ONE' ||
            alertForm.entityCriteria === 'ALL'
              ? ''
              : alertForm.entityCriteria,
            Validators.required,
          ],
          entityCriteriaValue: [
            alertForm.entityCriteria === 'ALL'
              ? ''
              : alertForm.entityCriteriaValue,
            Validators.required,
          ],
        });

        this.alertTrigger = this.formBuilder.group({
          update: [
            alertForm.update === true ? 'true' : 'false',
            Validators.required,
          ],
          attribute: [alertForm.attribute, Validators.required],
          wantedAttributeValue: [
            alertForm.wantedAttributeValue,
            Validators.required,
          ],
          dayNumber: [
            alertForm.dayNumber,
            [Validators.pattern(/^$|^[0-9]+[0-9]*$/), Validators.required],
          ],
        });

        this.alertDestination = this.formBuilder.group({
          alertMode: [alertForm.alertMode, Validators.required],
          destination: [
            alertForm.destination === 'ONE' || alertForm.destination === 'ALL'
              ? alertForm.destination
              : 'CRITERIA',
            Validators.required,
          ],
          destinationCriteria: [
            alertForm.destination === 'ONE' || alertForm.destination === 'ALL'
              ? ''
              : alertForm.destination,
            Validators.required,
          ],
          destinationValue: [alertForm.destinationValue, Validators.required],
          text: [alertForm.text, Validators.required],
        });
        console.log(this.alertSubject.value);
        console.log(this.alertTrigger.value);
        console.log(this.alertDestination.value);
      });
    } else {
      this.alertSubject = this.formBuilder.group({
        entity: ['employer'],
        entityTarget: ['ALL'],
        entityCriteria: ['', Validators.required],
        entityCriteriaValue: ['', Validators.required],
      });

      this.alertTrigger = this.formBuilder.group({
        update: ['', Validators.required],
        attribute: ['', Validators.required],
        wantedAttributeValue: ['', Validators.required],
        dayNumber: [
          '0',
          [Validators.pattern(/^$|^[0-9]+[0-9]*$/), Validators.required],
        ],
      });

      this.alertDestination = this.formBuilder.group({
        alertMode: ['CONSOLE', Validators.required],
        destination: ['', Validators.required],
        destinationCriteria: ['', Validators.required],
        destinationValue: ['', Validators.required],
        text: ['', Validators.required],
      });
    }
  }
  next() {
    if (this.step == 1) {
      this.personal_step = true;
      this.step++;
    } else if (this.step == 2) {
      this.address_step = true;
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
    this.showSpinner = true;
    this.alertService.handler(
      this.alertSubject,
      this.alertTrigger,
      this.alertDestination,
      this.id
    );
    if (this.editMode) {
      this.alertService.update().subscribe((alertForm: AlertForm) => {
        this.alertService.alertUpdated.next(alertForm);
        this.showSpinner = false;
        this.router.navigate(['/']);
      });
    } else {
      this.alertService.create().subscribe((alertForm: AlertForm) => {
        this.showSpinner = false;
        this.router.navigate(['/']);
      });
    }
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
