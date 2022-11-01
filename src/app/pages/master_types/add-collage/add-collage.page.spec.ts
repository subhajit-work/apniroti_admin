import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollagePage } from './add-collage.page';

describe('AddCollagePage', () => {
  let component: AddCollagePage;
  let fixture: ComponentFixture<AddCollagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCollagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCollagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
