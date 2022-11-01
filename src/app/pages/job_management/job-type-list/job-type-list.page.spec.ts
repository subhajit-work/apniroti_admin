import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTypeListPage } from './job-type-list.page';

describe('JobTypeListPage', () => {
  let component: JobTypeListPage;
  let fixture: ComponentFixture<JobTypeListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobTypeListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTypeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
