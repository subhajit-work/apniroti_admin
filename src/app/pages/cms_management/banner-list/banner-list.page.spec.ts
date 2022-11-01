import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerListPage } from './banner-list.page';

describe('BannerListPage', () => {
  let component: BannerListPage;
  let fixture: ComponentFixture<BannerListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
