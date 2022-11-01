import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteListPage } from './site-list.page';

describe('SiteListPage', () => {
  let component: SiteListPage;
  let fixture: ComponentFixture<SiteListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
