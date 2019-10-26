import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyprofilePage } from './companyprofile.page';

describe('CompanyprofilePage', () => {
  let component: CompanyprofilePage;
  let fixture: ComponentFixture<CompanyprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyprofilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
