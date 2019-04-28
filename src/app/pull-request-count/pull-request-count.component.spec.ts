import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PullRequestCountComponent} from './pull-request-count.component';

describe('PullRequestCountComponent', () => {
  let component: PullRequestCountComponent;
  let fixture: ComponentFixture<PullRequestCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PullRequestCountComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PullRequestCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
