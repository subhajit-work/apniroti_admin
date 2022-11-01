import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmailTemplatePage } from './add-email-template.page';

describe('AddEmailTemplatePage', () => {
  let component: AddEmailTemplatePage;
  let fixture: ComponentFixture<AddEmailTemplatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmailTemplatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmailTemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
