import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppUserPage } from './add-app-user.page';

describe('AddAppUserPage', () => {
  let component: AddAppUserPage;
  let fixture: ComponentFixture<AddAppUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAppUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
