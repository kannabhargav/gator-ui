import { Component, OnInit } from '@angular/core';
import {GitService} from '../git-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.less']
})
export class StatusComponent implements OnInit {
   hookStatus: boolean ;

  constructor(private gitService: GitService, private router: Router) {
    this.gitService.GetHookStatus("LabShare").subscribe(result => {
    this.hookStatus = result.val ; 
    });
   }

  ngOnInit() {
   
  }

  dashboard(){
    this.router.navigate (['/dashboard']) ;
  }
}
