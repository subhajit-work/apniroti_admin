import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollageListPage } from './collage-list.page';

describe('CollageListPage', () => {
  let component: CollageListPage;
  let fixture: ComponentFixture<CollageListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollageListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollageListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
