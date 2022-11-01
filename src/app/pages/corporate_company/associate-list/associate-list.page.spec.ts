import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateListPage } from './associate-list.page';

describe('AssociateListPage', () => {
  let component: AssociateListPage;
  let fixture: ComponentFixture<AssociateListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
