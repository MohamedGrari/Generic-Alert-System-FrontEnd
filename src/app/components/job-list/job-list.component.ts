import { Component, OnInit } from '@angular/core';
import { Employer } from 'src/app/models/employer.model';
import { Job } from 'src/app/models/job.model';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [
    new Job('1', 'foo', '2022-12-01', '2022-11-28', 2, 3),
    new Job('2', 'med', '2022-11-04', '2022-10-01', 1, 4),
    new Job('2', 'ahmed', '2022-11-04', '2022-10-01', 6, 9),
  ];
  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobService
      .get()
      .subscribe((job: Job[]) => {
        this.jobs = job;
        console.log(this.jobs)
      });
  }

  getStatusClasses(job: Job) {
    return {
      'list-group-item-success': new Date(job.alertTime) > new Date(),
      'list-group-item-warning': new Date(job.alertTime) < new Date(),
    };
  }
  onDelete(job: Job) {
    this.jobService.delete(job).subscribe(() => {
      this.jobs.splice(this.jobs.indexOf(job), 1);
    });
  }
}
