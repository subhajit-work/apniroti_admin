import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSkillPage } from './add-skill.page';

describe('AddSkillPage', () => {
  let component: AddSkillPage;
  let fixture: ComponentFixture<AddSkillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSkillPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSkillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
