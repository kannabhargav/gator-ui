import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
// import {TopNavModule} from '@labshare/stateful-components';
// import {LeftNavModule} from '@labshare/stateful-components';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
// import {FitWindowModule} from '@labshare/stateful-components';
import {PullRequestCountComponent} from './pull-request-count/pull-request-count.component';
import {HttpClientModule} from '@angular/common/http';
import {TopRepositoryComponent} from './top-repository/top-repository.component';
import {TopDevelopersComponent} from './top-developers/top-developers.component';
import {DevPullDetailsComponent} from './dev-pull-details/dev-pull-details.component';
import {
  BrowserAnimationsModule
}  from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {Routes, RouterModule} from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CallbackComponent } from './callback/callback.component';
import {GitService} from './git-service';
import { LOCAL_STORAGE, StorageServiceModule } from 'angular-webstorage-service';
import { StatusComponent } from './status/status.component';
import { OrgListComponent } from './org-list/org-list.component'

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'dashboard', component:DashboardComponent}
  //{path: 'status', component:StatusComponent}
];

@NgModule({
  declarations: [AppComponent, PullRequestCountComponent, TopRepositoryComponent, TopDevelopersComponent, DevPullDetailsComponent, LoginComponent, DashboardComponent, CallbackComponent, StatusComponent, OrgListComponent],
  imports: [BrowserModule,RouterModule.forRoot(routes),  AppRoutingModule,// TopNavModule, LeftNavModule, //FitWindowModule, 
    StorageServiceModule,
    HttpClientModule, BrowserAnimationsModule],
  providers: [CookieService , GitService ],
  exports: [RouterModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
