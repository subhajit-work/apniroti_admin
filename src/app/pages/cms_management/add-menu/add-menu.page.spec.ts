import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMenuPage } from './add-menu.page';

describe('AddMenuPage', () => {
  let component: AddMenuPage;
  let fixture: ComponentFixture<AddMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMenuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
