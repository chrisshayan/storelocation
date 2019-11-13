import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsScatterComponent } from './charts-scatter.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

xdescribe('ChartsScatterComponent', () => {
  let component: ChartsScatterComponent;
  let fixture: ComponentFixture<ChartsScatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartsScatterComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsScatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create charts-scatter component', () => {
    expect(component).toBeTruthy();
  });
});
