import { Component, OnInit } from '@angular/core';
import { AlertForm } from 'src/app/models/alert-form.model';

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.css'],
})
export class AlertListComponent implements OnInit {
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
  constructor() {}

  ngOnInit(): void { }
  getStatusClasses(alertForm: AlertForm) {
    return {
      'list-group-item-success': alertForm.update === true,
      'list-group-item-danger': alertForm.update === false,
    };
  }
  onDelete() {

  }
}
