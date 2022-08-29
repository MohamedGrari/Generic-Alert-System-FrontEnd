import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertForm } from 'src/app/models/alert-form.model';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.css'],
})
export class AlertListComponent implements OnInit {
  alertSubscription: Subscription;

  alerts: AlertForm[] = [
    {
      id: 1,
      entity: 'employer',
      entityCriteria: 'position',
      entityCriteriaValue: 'MANAGER',
      attribute: 'hireDate',
      wantedAttributeValue: 'AT',
      update: false,
      dayNumber: 0,
      alertMode: 'SMS',
      destination: 'ALL',
      destinationValue: '',
      text: 'hi by med',
    },
    {
      id: 2,
      entity: 'employer',
      entityCriteria: 'position',
      entityCriteriaValue: 'MANAGER',
      attribute: 'position',
      wantedAttributeValue: 'RH',
      update: true,
      dayNumber: 0,
      alertMode: 'SMS',
      destination: 'ALL',
      destinationValue: '',
      text: 'hi by med',
    },
    {
      id: 3,
      entity: 'employer',
      entityCriteria: 'position',
      entityCriteriaValue: 'RH',
      attribute: 'birthday',
      wantedAttributeValue: 'BEFORE',
      update: false,
      dayNumber: 2,
      alertMode: 'SMS',
      destination: 'ALL',
      destinationValue: '',
      text: 'hi by med',
    }
  ];
  constructor(private alertService: AlertService) {}

  ngOnInit(): void { 
    this.alertSubscription = this.alertService
      .get()
      .subscribe((alert: AlertForm[]) => {
        this.alerts = alert;
      });
    this.alertService.alertUpdated.subscribe((alert: AlertForm) => {
      for (let alertItem of this.alerts) {
        if (alertItem.id === alert.id) {
          this.alerts.splice(this.alerts.indexOf(alertItem), 1,alert);
        }
      }
    })
  }
  getStatusClasses(alertForm: AlertForm) {
    return {
      'list-group-item-success': alertForm.update === true,
      'list-group-item-danger': alertForm.update === false,
    };
  }
  onDelete(alert: AlertForm) {
    this.alertService.delete(alert).subscribe(
      () => {
        this.alerts.splice(this.alerts.indexOf(alert), 1);
      }
    )
  }

}
