import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFaqPage } from './add-faq.page';

describe('AddFaqPage', () => {
  let component: AddFaqPage;
  let fixture: ComponentFixture<AddFaqPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFaqPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFaqPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
