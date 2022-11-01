import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSubjectPage } from './question-subject.page';

describe('QuestionSubjectPage', () => {
  let component: QuestionSubjectPage;
  let fixture: ComponentFixture<QuestionSubjectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionSubjectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionSubjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
