import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AftersplashPage } from './aftersplash.page';

describe('AftersplashPage', () => {
  let component: AftersplashPage;
  let fixture: ComponentFixture<AftersplashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AftersplashPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AftersplashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
