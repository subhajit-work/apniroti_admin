import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSkillSubjectPage } from './add-skill-subject.page';

describe('AddSkillSubjectPage', () => {
  let component: AddSkillSubjectPage;
  let fixture: ComponentFixture<AddSkillSubjectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSkillSubjectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSkillSubjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
