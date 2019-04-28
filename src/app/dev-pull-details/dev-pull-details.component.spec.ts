import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DevPullDetailsComponent} from './dev-pull-details.component';

describe('DevPullDetailsComponent', () => {
  let component: DevPullDetailsComponent;
  let fixture: ComponentFixture<DevPullDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DevPullDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevPullDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
