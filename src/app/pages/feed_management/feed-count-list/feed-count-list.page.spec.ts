import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedCountListPage } from './feed-count-list.page';

describe('FeedCountListPage', () => {
  let component: FeedCountListPage;
  let fixture: ComponentFixture<FeedCountListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedCountListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedCountListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
