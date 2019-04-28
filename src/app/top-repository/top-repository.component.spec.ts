import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TopRepositoryComponent} from './top-repository.component';

describe('TopRepositoryComponent', () => {
  let component: TopRepositoryComponent;
  let fixture: ComponentFixture<TopRepositoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopRepositoryComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
