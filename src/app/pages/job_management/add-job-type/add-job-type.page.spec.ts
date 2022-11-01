import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobTypePage } from './add-job-type.page';

describe('AddJobTypePage', () => {
  let component: AddJobTypePage;
  let fixture: ComponentFixture<AddJobTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddJobTypePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJobTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
