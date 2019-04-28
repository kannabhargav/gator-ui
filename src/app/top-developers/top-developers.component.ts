import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';
import {GitService} from '../git-service';
import {Observable, of} from 'rxjs';
import {toArray} from 'rxjs/operators';
import {debug} from 'util';
import * as _ from 'lodash';

@Component({
  selector: 'app-top-developers',
  templateUrl: './top-developers.component.html',
  styleUrls: ['./top-developers.component.less'],
})
export class TopDevelopersComponent implements OnInit {
  developers: any[];
  avatar: any[];
  devDetails: any[];

  @Output()
  messageEvent = new EventEmitter<string>();

  constructor(private gitService: GitService, private router: Router) {
    this.developers = [];
    this.avatar = [];
  }

  data(developer: string) {
    this.gitService.trigger(developer);
    // this.messageEvent.emit (developer); Didn't work! Investigate
  }
  ngOnInit() {
    this.gitService.GetTopDevelopers("LabShare", 7).subscribe(val => {
      const devs = val.map(item => item.login + '--' + item.Avatar_Url).filter((value, index, self) => self.indexOf(value) === index);
    
      devs.map(item => {
        const arr = _.split(item, '--');
        this.avatar.push(arr[1]);
        console.log(this.avatar)
        this.developers.push(arr[0]);
      });
    });
  }
}
