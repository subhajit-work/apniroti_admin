import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCmsPage } from './add-cms.page';

describe('AddCmsPage', () => {
  let component: AddCmsPage;
  let fixture: ComponentFixture<AddCmsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCmsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCmsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
