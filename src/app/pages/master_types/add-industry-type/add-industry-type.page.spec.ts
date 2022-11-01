import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIndustryTypePage } from './add-industry-type.page';

describe('AddIndustryTypePage', () => {
  let component: AddIndustryTypePage;
  let fixture: ComponentFixture<AddIndustryTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIndustryTypePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIndustryTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
