import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeedCountPage } from './add-feed-count.page';

describe('AddFeedCountPage', () => {
  let component: AddFeedCountPage;
  let fixture: ComponentFixture<AddFeedCountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFeedCountPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeedCountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
