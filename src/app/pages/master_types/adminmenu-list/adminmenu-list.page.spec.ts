import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmenuListPage } from './adminmenu-list.page';

describe('AdminmenuListPage', () => {
  let component: AdminmenuListPage;
  let fixture: ComponentFixture<AdminmenuListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminmenuListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminmenuListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
