import {Injectable, Input, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {Router} from '@angular/router';
import {promise} from 'protractor';
import {resolve} from 'path';
import {reject} from 'q';

@Injectable({
  providedIn: 'root',
})
export class GitService {
  httpOptions: any;
  query: string;
  token: string;
  tenant: string;
  public organization: string;

  public gatorApiUrl = 'http://localhost:3000'; //'https://gator-api.azurewebsites.net' ;
  public gitApiUrl: string = this.gatorApiUrl + '/service/'; //'http://localhost:3000/service/'; //'https://gator-be.azurewebsites.net/service/'; //'http://localhost:3000/service/';

  //Components listen to each other using this
  private _onMyEvent = new Subject<string>();
  private _onOrgEvent = new Subject<string>();

  public get onMyEvent(): Observable<string> {
    return this._onMyEvent.asObservable();
  }

  public currentOrg: string;

  /* 
   Component calls this trigger

   pullRequestCount it with "Action -day" and Top-developer calls it with developer name

   DevPullDetailsComponent is subscribing it
     this.gitService.onMyEvent.subscribe((val: string) => {
  */
  public trigger(value: string) {
    this._onMyEvent.next(value);
  }

  public orgTrigger(value: string) {
    this._onOrgEvent.next(value);
  }

  constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router) {
    console.log('gitservice is created');
    this.CheckOrg();
    console.log('==> org:' + this.currentOrg);
  }

  GetHookStatus(org: string): any {
    this.AttachToken();
    const q = `GetHookStatus?tenant=${this.tenant}&org=${org}`;
    return this.http.get(this.gitApiUrl + q, this.httpOptions);
  }

  SetupWebHook(org: string): any {
    this.AttachToken();
    const q = `SetupWebHook?tenant=${this.tenant}&org=${org}`;
    return this.http.get(this.gitApiUrl + q, this.httpOptions);
  }

  GetOrgList(): any {
    this.AttachToken(true);
    console.log('calling GetOrgList API');
    const q = `GetOrg?tenant=${this.tenant}`;
    return this.http.get(this.gitApiUrl + q, this.httpOptions);
  }

  GetRepoList(org: string): any {
    this.AttachToken();
    const q = `GetRepos?tenant=${this.tenant}&org=${org}&bustTheCache=false&getFromGit=false`;
    return this.http.get(this.gitApiUrl + q, this.httpOptions);
  }

  GetPullRequest(org: string): any {
    this.AttachToken();
    const q = `GetPRfromGit?tenant=${this.tenant}&org=${org}`;
    return this.http.get(this.gitApiUrl + q, this.httpOptions);
  }

  AttachToken(skipOrgCheck: boolean = false) {
    if (!skipOrgCheck) {
      this.CheckOrg(); //Will not check if the call is coming from GetOrgList, else always does. Skip for GetOrg else it infitite loop
    }
    if (!this.token) {
      this.token = this.storage.get('token');
      this.tenant = this.token; //Today token and tenant is same
    }

    try {
      // console.log('token: ' + this.token);
      if (this.token) {
        this.httpOptions = {
          headers: new HttpHeaders({
            'X-GitHub-Delivery': 'xxx',
            'X-Hub-Signature': 'xxx',
            'X-GitHub-Event': 'xxx',
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
            'Content-Type': 'text/html; charset=utf-8',
            Authorization: this.token,
          }),
        };
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  async Ready(): Promise<boolean> {
    console.log('Ready called');
    return new Promise(async (resolve, reject) => {
      await this.CheckOrg().then(result => {
        console.log('ready resolved - org:' + this.currentOrg);
        resolve(true);
      });
    });
  }

  async CheckOrg() {
    console.log('CheckOrg called');
    return new Promise((resolve, reject) => {
      if (this.currentOrg === undefined) {
        this.GetOrgList().subscribe(result => {
          if (result.length > 0) {
            this.currentOrg = result[0].Org;
            resolve();
          } else {
            reject();
          }
        });
      } else {
        resolve();
      }
    });
  }

  GetDeveloperDetail(tenant: string, day: number = 7, login: string, Action: string, pageSize: number = 20): Observable<any> {
    const q = `PullRequest4Dev?tenant=${tenant}&day=${day}&login=${login}&action=${Action}&pageSize=${pageSize}`;
    this.AttachToken();
    return this.http.get(this.gitApiUrl + q, this.httpOptions);
  }

  // GetPullRequestCount for last 7 days, 30 days etc
  GetPullRequestCount(tenant: string, day: number = 7): Observable<any> {
    this.AttachToken();
    const q = `PullRequestCountForLastXDays?tenant=${tenant}&day=${day}`;
    return this.http.get(this.gitApiUrl + q, this.httpOptions);
  }

  // GetTopRepositories for last 7 days, 30 days etc
  GetTopRepositories(org: string, day: number = 7): Observable<any> {
    this.AttachToken();
    // tslint:disable-next-line: max-line-length
    const q = `GetTopRespositories4XDays?org=${org}&day=${day}`;
    return this.http.get(this.gitApiUrl + q, this.httpOptions);
  }

  GetTopDevelopers(org: string, day: number): Observable<any> {
    this.AttachToken();
    const q = `TopDevForLastXDays?org=${org}&day=${day}`;
    return this.http.get(this.gitApiUrl + q, this.httpOptions);
  }

  //Gets detail pull request
  GetPullRequestForPastXDay(tenant: string, day: number): Observable<any> {
    this.AttachToken();
    // tslint:disable-next-line: max-line-length
    const q = `PullRequestForLastXDays?tenant=${tenant}&day=${day}`;
    return this.http.get(this.gitApiUrl + q, this.httpOptions);
  }
}
