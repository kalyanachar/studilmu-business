import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursefeedbackPage } from './coursefeedback.page';

describe('CoursefeedbackPage', () => {
  let component: CoursefeedbackPage;
  let fixture: ComponentFixture<CoursefeedbackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursefeedbackPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursefeedbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
