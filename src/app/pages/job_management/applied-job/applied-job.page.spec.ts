import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedJobPage } from './applied-job.page';

describe('AppliedJobPage', () => {
  let component: AppliedJobPage;
  let fixture: ComponentFixture<AppliedJobPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppliedJobPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedJobPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
