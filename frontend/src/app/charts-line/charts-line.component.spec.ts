import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsLineComponent } from './charts-line.component';

describe('ChartsLineComponent', () => {
  let component: ChartsLineComponent;
  let fixture: ComponentFixture<ChartsLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
