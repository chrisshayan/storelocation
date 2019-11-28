import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesCollectionComponent } from './places-collection.component';

describe('PlacesCollectionComponent', () => {
  let component: PlacesCollectionComponent;
  let fixture: ComponentFixture<PlacesCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacesCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
