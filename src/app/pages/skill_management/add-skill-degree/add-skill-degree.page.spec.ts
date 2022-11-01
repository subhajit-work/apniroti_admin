import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSkillDegreePage } from './add-skill-degree.page';

describe('AddSkillDegreePage', () => {
  let component: AddSkillDegreePage;
  let fixture: ComponentFixture<AddSkillDegreePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSkillDegreePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSkillDegreePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
