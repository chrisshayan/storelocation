import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesCardComponent } from './places-card.component';

describe('PlacesCardComponent', () => {
  let component: PlacesCardComponent;
  let fixture: ComponentFixture<PlacesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacesCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
