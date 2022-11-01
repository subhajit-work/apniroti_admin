import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminmenuPage } from './add-adminmenu.page';

describe('AddAdminmenuPage', () => {
  let component: AddAdminmenuPage;
  let fixture: ComponentFixture<AddAdminmenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdminmenuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminmenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
