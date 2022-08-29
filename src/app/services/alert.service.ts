import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map, Observable, Subject } from 'rxjs';
import { AlertForm } from '../models/alert-form.model';

const baseUrl = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root',
})
export class AlertService {

  alertUpdated = new Subject<AlertForm>();
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
    // console.log(this.alertForm);
    return this.http.post<AlertForm>(baseUrl + 'saveRequest', this.alertForm);
  }

  update(): Observable<AlertForm> {
    return this.http.put<AlertForm>(baseUrl + 'updateRequest', this.alertForm);
  }

  get(): Observable<AlertForm[]> {
    return this.http.get<AlertForm[]>(baseUrl + 'requests').pipe(
      map(response => {return response;}));
  }

  delete(alert: AlertForm): Observable<void> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: alert,
    };
    return this.http.delete<void>(baseUrl + 'deleteRequest', options);
  }

  handler(
    alertSubject: FormGroup,
    alertTrigger: FormGroup,
    alertDestination: FormGroup,
    id?: number
  ) {
    // alertSubject.value['entityTarget'] === 'ONE'
    //   ? +alertSubject.value['entityCriteriaValue']
    if (id) {
      this.alertForm['id'] = id;
    }
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
  getById(id: number) {
    // return {
    //   entity: 'employer',
    //   entityCriteria: 'position',
    //   entityCriteriaValue: 'MANAGER',
    //   attribute: 'position',
    //   wantedAttributeValue: 'RH',
    //   update: true,
    //   dayNumber: 0,
    //   alertMode: 'SMS',
    //   destination: 'ALL',
    //   destinationValue: '',
    //   text: 'hi by med',
    // };
    return this.http.get<AlertForm>(baseUrl + "request/" + id);
  }
}
