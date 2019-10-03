import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsScatterComponent } from './charts-scatter.component';

describe('ChartsScatterComponent', () => {
  let component: ChartsScatterComponent;
  let fixture: ComponentFixture<ChartsScatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsScatterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsScatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
