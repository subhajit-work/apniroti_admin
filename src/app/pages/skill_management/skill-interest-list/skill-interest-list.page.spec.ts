import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillInterestListPage } from './skill-interest-list.page';

describe('SkillInterestListPage', () => {
  let component: SkillInterestListPage;
  let fixture: ComponentFixture<SkillInterestListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillInterestListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillInterestListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
