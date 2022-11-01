import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillDegreeListPage } from './skill-degree-list.page';

describe('SkillDegreeListPage', () => {
  let component: SkillDegreeListPage;
  let fixture: ComponentFixture<SkillDegreeListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillDegreeListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillDegreeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
