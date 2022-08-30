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
  showSpinner: boolean = true;
  searchText: any;
  p: number = 1;
  jobs: Job[] = [
    // new Job('1', 'foo', '2022-12-01', '2022-11-28', 2, 3),
    // new Job('2', 'med', '2022-11-04', '2022-10-01', 1, 4),
    // new Job('2', 'ahmed', '2022-11-04', '2022-10-01', 6, 9),
  ];
  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobService.get().subscribe((job: Job[]) => {
      if (job) {
        this.showSpinner = false;
      }
      this.jobs = job;
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