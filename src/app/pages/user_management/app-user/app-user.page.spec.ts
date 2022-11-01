import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserPage } from './app-user.page';

describe('AppUserPage', () => {
  let component: AppUserPage;
  let fixture: ComponentFixture<AppUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
