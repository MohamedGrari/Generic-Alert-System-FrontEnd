import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Job } from '../models/job.model';

const baseUrl = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private http: HttpClient) {}

  get(): Observable<Job[]> {
    return this.http.get<Job[]>(baseUrl + 'jobs').pipe(
      map((response) => {
        return response;
      })
    );
  }

  delete(job: Job): Observable<void> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: job,
    };
    return this.http.delete<void>(baseUrl + 'deleteJob', options);
  }
}
