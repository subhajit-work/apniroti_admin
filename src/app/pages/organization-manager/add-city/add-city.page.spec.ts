import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCityPage } from './add-city.page';

describe('AddCityPage', () => {
  let component: AddCityPage;
  let fixture: ComponentFixture<AddCityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
