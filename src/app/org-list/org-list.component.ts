import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';
import {GitService} from '../git-service';

@Component({
  selector: 'app-org-list',
  templateUrl: './org-list.component.html',
  styleUrls: ['./org-list.component.less']
})
export class OrgListComponent implements OnInit {

  orgList: any[];
  
  constructor(private gitService: GitService, private router: Router) { }

  data(org: any) {
    this.gitService.currentOrg = org.Org;
    this.router.onSameUrlNavigation = 'reload';
    this.router.initialNavigation();
    this.router.navigate(['/dashboard'],{
      queryParams: {refresh: new Date().getTime()}
   })
    console.log ('from orgList' + this.gitService.currentOrg);
  }

  ngOnInit() {
     this.gitService.GetOrgList ().subscribe ( result => {
        this.orgList = result ;
     })
  }

}
