import {Component, OnInit, EventEmitter, Input} from '@angular/core';
import {GitService} from '../git-service';
import {Observable, of, Subject} from 'rxjs';
import {toArray} from 'rxjs/operators';
import {debug} from 'util';
import * as _ from 'lodash';

@Component({
  selector: 'app-dev-pull-details',
  templateUrl: './dev-pull-details.component.html',
  styleUrls: ['./dev-pull-details.component.less'],
})


export class DevPullDetailsComponent implements OnInit {
  devDetails: any[];
  developer: string;

  constructor(private gitService: GitService) {

    this.gitService.onMyEvent.subscribe((val: string) => {
      if (val.lastIndexOf ('-') > 0) {
        const arr = _.split(val, '-');
        this.getActionDetails (arr[0], Number(arr[1]));
      }else
        this.getDeveloperDetails(val);
    });
  }

  getDeveloperDetails (developer: string){
    
    this.gitService.GetDeveloperDetail("LabShare", 7, developer, "", 20).subscribe(val => {
  
      this.devDetails = val;
      this.devDetails.map(v => {
        let s = v.pullrequesturl;
        s = s.replace('https://api.github.com/repos', 'https://github.com');
        s = s.replace('pulls', 'pull');
        s = s.replace('comments', ' ');
        v.pullrequesturl = s;
        
      });
    });
  }

  //action => opened, closed
  getActionDetails (action: string, day: number){

    this.gitService.GetDeveloperDetail("LabShare", day, "", action, 20).subscribe(val => {
      this.devDetails = val;
      this.devDetails.map(v => {
        let s = v.pullrequesturl;
        s = s.replace('https://api.github.com/repos', 'https://github.com');
        s = s.replace('pulls', 'pull');
        s = s.replace('comments', ' ');
        v.pullrequesturl = s;
      });
    });
  }
  ngOnInit() {}

  // receiveMessage($event: string) {
  
  //   this.developer = $event;
  //   this.gitService.GetDeveloperDetail("LabShare", 1, this.developer, "opened", 10).subscribe(val => {
  //     this.devDetails = val;
  //   });
  // }
}
