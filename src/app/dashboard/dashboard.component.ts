import {Component, OnInit} from '@angular/core';
//import {StatefulComponent} from '@labshare/ngx-stateful';
import {ChangeDetectorRef} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ChangeDetectionStrategy, Input} from '@angular/core';

export const STATE = () => ({
  items: [{name: 'Team'}, {name: 'Repositories'}, {name: 'Developers'}],
  sectionItems: [{name: 'Team'}, {name: 'Repositories'}, {name: 'Developers'}],
});
type PaneType = 'left' | 'right';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'], // changeDetection: ChangeDetectionStrategy.OnPush,
  // animations: [
  //   trigger('slide', [
  //     state('hide', style({ transform: 'translateX(-100%)' })),
  //     state('show', style({ transform: 'translateX(0)' })),
  //     transition('* => *', animate(300))
  // ])]
})
export class DashboardComponent implements OnInit {
  orgs: any;
  constructor() {}

  ngOnInit() {}
}
