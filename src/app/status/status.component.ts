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
    //Get Org Details
    this.gitService.GetOrgList().subscribe(result => {
      if (result.length > 0) {
        this.orgStatus = true;
        this.orgList = result;
        this.gitService.currentOrg = this.orgList[0].Org ;

        this.orgList.forEach(element => {
          this.gitService.GetHookStatus(element.Org).subscribe(result => {
            this.hookStatus = result.val;
            if (!this.hookStatus) {
              //lets install the hook
              this.gitService.SetupWebHook(element.Org).subscribe(result => {
                this.hookStatus = result.val;
              });
            }
          });
          //Get Repos
          this.gitService.GetRepoList(element.Org).subscribe(result => {
            //TODO: Turn the result into true and false
            if (result.length > 0) {
              this.repoStatus = true;
            }
          });
          //Get Pull Request
          this.gitService.GetPullRequest(element.Org).subscribe(result => {
            //TODO: Turn the result into true and false
            this.prStatus = result.val;
          });
        });
      }
    });
  }

  ngOnInit() {}

  dashboard() {
    this.router.navigate(['/dashboard']);
  }
}
