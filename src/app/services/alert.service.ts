import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AlertForm } from '../models/alert-form.model';

const baseUrl = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alertForm: AlertForm = {
    alertMode: '',
    entity: '',
    entityCriteria: '',
    entityCriteriaValue: '',
    attribute: '',
    wantedAttributeValue: '',
    text: '',
    dayNumber: null,
    destination: '',
    destinationValue: '',
    update: null,
  };

  constructor(private http: HttpClient) {}

  create(): Observable<AlertForm> {
    console.log(this.alertForm);
    return this.http.post<AlertForm>(baseUrl + 'saveRequest', this.alertForm);
  }

  handler(
    alertSubject: FormGroup,
    alertTrigger: FormGroup,
    alertDestination: FormGroup
  ) {
    // alertSubject.value['entityTarget'] === 'ONE'
    //   ? +alertSubject.value['entityCriteriaValue']
    this.alertForm['entity'] = alertSubject.value['entity'];
    this.alertForm['entityCriteria'] =
      alertSubject.value['entityTarget'] === 'null'
        ? alertSubject.value['entityCriteria']
        : alertSubject.value['entityTarget'];
    this.alertForm['entityCriteriaValue'] =
      alertSubject.value['entityCriteriaValue'];
    this.alertForm['update'] = alertTrigger.value['update'] == 'true';
    this.alertForm['attribute'] = alertTrigger.value['attribute'];
    this.alertForm['dayNumber'] = alertTrigger.value['dayNumber'];
    this.alertForm['wantedAttributeValue'] =
      alertTrigger.value['wantedAttributeValue'];
    this.alertForm['destination'] =
      alertDestination.value['destination'] === 'CRITERIA'
        ? alertDestination.value['destinationCriteria']
        : alertDestination.value['destination'];
    this.alertForm['destinationValue'] =
      alertDestination.value['destinationValue'];
    this.alertForm['text'] = alertDestination.value['text'];
    this.alertForm['alertMode'] = alertDestination.value['alertMode'];
  }
}
