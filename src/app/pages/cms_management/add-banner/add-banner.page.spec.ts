import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBannerPage } from './add-banner.page';

describe('AddBannerPage', () => {
  let component: AddBannerPage;
  let fixture: ComponentFixture<AddBannerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBannerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBannerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
