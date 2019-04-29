import {Injectable, Input, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GitService {
  httpOptions: any;
  query: string;
  token: string;
  tenant: string;
  org: string;

  private gitUrl: string = 'http://localhost:3000/service/'; //'https://gator-be.azurewebsites.net/service/'; //'http://localhost:3000/service/';

  //Components listen to each other using this
  private _onMyEvent = new Subject<string>();
  public get onMyEvent(): Observable<string> {
    return this._onMyEvent.asObservable();
  }

  /* 
   Component calls this trigger
   pullRequestCount it with "Action -day" and Top-developer calls it with developer name
  */
  public trigger(value: string) {
    this._onMyEvent.next(value);
  }

  constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router) {
    console.log('gitservice is created');
  }

  GetHookStatus(org: string): any {
    this.AttachToken();
    const q = `GetHookStatus?tenant=${this.tenant}&org=${org}`;

    return this.http.get(this.gitUrl + q, this.httpOptions);
  }

  AttachToken() {
    if (!this.token) {
      this.token = this.storage.get('token');
      this.tenant = this.token; //Today token and tenant is same
    }

    try {
      console.log('token: ' + this.token);
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
  GetDeveloperDetail(tenant: string, day: number = 7, login: string, Action: string, pageSize: number = 20): Observable<any> {
    const q = `PullRequest4Dev?tenant=${tenant}&day=${day}&login=${login}&action=${Action}&pageSize=${pageSize}`;
    this.AttachToken();
    return this.http.get(this.gitUrl + q, this.httpOptions);
  }

  // GetPullRequestCount for last 7 days, 30 days etc
  GetPullRequestCount(tenant: string, day: number = 7): Observable<any> {
    this.AttachToken();
    const q = `PullRequestCountForLastXDays?tenant=${tenant}&day=${day}`;
    return this.http.get(this.gitUrl + q, this.httpOptions);
  }

  // GetTopRepositories for last 7 days, 30 days etc
  GetTopRepositories(tenant: string, day: number = 7): Observable<any> {
    this.AttachToken();
    // tslint:disable-next-line: max-line-length
    const q = `GetTopRespositories4XDays?tenant=${tenant}&day=${day}`;
    return this.http.get(this.gitUrl + q, this.httpOptions);
  }

  GetTopDevelopers(tenant: string, day: number): Observable<any> {
    this.AttachToken();
    const q = `TopDevForLastXDays?tenant=${tenant}&day=${day}`;
    return this.http.get(this.gitUrl + q, this.httpOptions);
  }

  //Gets detail pull request
  GetPullRequestForPastXDay(tenant: string, day: number): Observable<any> {
    this.AttachToken();
    // tslint:disable-next-line: max-line-length
    const q = `PullRequestForLastXDays?tenant=${tenant}&day=${day}`;
    return this.http.get(this.gitUrl + q, this.httpOptions);
  }
}
