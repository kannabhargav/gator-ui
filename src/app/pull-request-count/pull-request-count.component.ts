import {Component, OnInit} from '@angular/core';
import {GitService} from '../git-service';
import {Observable, of} from 'rxjs';
import {toArray} from 'rxjs/operators';
import {debug, isNullOrUndefined} from 'util';

@Component({
  selector: 'app-pull-request-count',
  templateUrl: './pull-request-count.component.html',
  styleUrls: ['./pull-request-count.component.less'],
})
export class PullRequestCountComponent implements OnInit {
  count: number = 0;
  todayCount: number = 0;
  weekCount: number = 0;
  closeCount: number = 0;
  todayCloseCount: number = 0;
  weekCloseCount: number = 0;

  constructor(private gitService: GitService) {
    this.count = 0;
    this.todayCount = 0; 
    this.weekCount = 0;
    this.todayCloseCount = 0;
  }
  data( action: string, day: number) {
    this.gitService.trigger(action + "-" + day.toString());
    // this.messageEvent.emit (developer); Didn't work! Investigate
  }
  ngOnInit() {
    this.gitService.GetPullRequestCount("LabShare", 1).subscribe(val => {
      if (val[0][0]) {
        if (val[0][0].Action === "opened") {
          this.todayCount = val[0][0].ctr;
        }
        else
        {
          this.todayCloseCount = val[0][0].ctr;
        }
      }

      if (val[0][1]) {
        if (val[0][1].Action === "opened") {
          this.todayCount = val[0][1].ctr;
        }
        else
        {
          this.todayCloseCount = val[0][1].ctr;
        }
      }
    });

    this.gitService.GetPullRequestCount("LabShare", 7).subscribe(val => {
      this.weekCount = val[0][1].ctr;
      this.weekCloseCount = val[0][0].ctr;
    });

    this.gitService.GetPullRequestCount("LabShare", 30).subscribe(val => {
      this.count = val[0][1].ctr;
      this.closeCount = val[0][0].ctr;
    });

   
  }
}
