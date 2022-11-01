import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillSubjectListPage } from './skill-subject-list.page';

describe('SkillSubjectListPage', () => {
  let component: SkillSubjectListPage;
  let fixture: ComponentFixture<SkillSubjectListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillSubjectListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillSubjectListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
