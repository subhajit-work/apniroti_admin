import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSkillInterestPage } from './add-skill-interest.page';

describe('AddSkillInterestPage', () => {
  let component: AddSkillInterestPage;
  let fixture: ComponentFixture<AddSkillInterestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSkillInterestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSkillInterestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
