import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemVariableListPage } from './system-variable-list.page';

describe('SystemVariableListPage', () => {
  let component: SystemVariableListPage;
  let fixture: ComponentFixture<SystemVariableListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemVariableListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemVariableListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
