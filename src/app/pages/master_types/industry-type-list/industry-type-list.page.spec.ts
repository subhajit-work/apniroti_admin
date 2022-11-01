import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryTypeListPage } from './industry-type-list.page';

describe('IndustryTypeListPage', () => {
  let component: IndustryTypeListPage;
  let fixture: ComponentFixture<IndustryTypeListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndustryTypeListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustryTypeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
