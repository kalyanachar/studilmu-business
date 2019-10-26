import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcoursePage } from './listcourse.page';

describe('ListcoursePage', () => {
  let component: ListcoursePage;
  let fixture: ComponentFixture<ListcoursePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListcoursePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcoursePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
