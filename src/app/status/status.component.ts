import {Component, OnInit} from '@angular/core';
import {GitService} from '../git-service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.less'],
})
export class StatusComponent implements OnInit {
  hookStatus: boolean = false;
  orgStatus: boolean = false;
  repoStatus: boolean = false;
  prStatus: boolean = false;
  orgList: any;

  constructor(private gitService: GitService, private router: Router) {
    this.gitService.GetHookStatus('LabShare').subscribe(result => {
      this.hookStatus = result.val;
      if (!this.hookStatus) {
        //lets install the hook
        this.gitService.SetupWebHook('LabShare').subscribe(result => {
          this.hookStatus = result.val;
        });
      }
    });
    //Get Org Details
    this.gitService.GetOrgList().subscribe(result => {
      if (result.length > 0) {
        this.orgStatus = true;
        this.orgList = result;
      }
    });
    //Get Repos
    this.gitService.GetRepoList('LabShare').subscribe(result => {
      //TODO: Turn the result into true and false
      if (result.length > 0) {
        this.repoStatus = true;
      }
     
    });

    //Get Pull Request
    this.gitService.GetPullRequest('LabShare').subscribe(result => {
      //TODO: Turn the result into true and false
      this.prStatus = result.val;
    });
  }

  ngOnInit() {}

  dashboard() {
    this.router.navigate(['/dashboard']);
  }
}
