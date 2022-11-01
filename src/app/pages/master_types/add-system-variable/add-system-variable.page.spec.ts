import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSystemVariablePage } from './add-system-variable.page';

describe('AddSystemVariablePage', () => {
  let component: AddSystemVariablePage;
  let fixture: ComponentFixture<AddSystemVariablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSystemVariablePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSystemVariablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
