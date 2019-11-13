import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsLineComponent } from './charts-line.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ChartsLineComponent', () => {
  let component: ChartsLineComponent;
  let fixture: ComponentFixture<ChartsLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartsLineComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create charts-line component', () => {
    expect(component).toBeTruthy();
  });
});
