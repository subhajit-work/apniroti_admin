import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyTypePage } from './add-company-type.page';

describe('AddCompanyTypePage', () => {
  let component: AddCompanyTypePage;
  let fixture: ComponentFixture<AddCompanyTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCompanyTypePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompanyTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
