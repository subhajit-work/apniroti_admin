import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionSubjectPage } from './add-question-subject.page';

describe('AddQuestionSubjectPage', () => {
  let component: AddQuestionSubjectPage;
  let fixture: ComponentFixture<AddQuestionSubjectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQuestionSubjectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuestionSubjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
