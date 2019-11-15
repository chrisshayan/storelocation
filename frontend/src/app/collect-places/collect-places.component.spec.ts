import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectPlacesComponent } from './collect-places.component';

describe('CollectPlacesComponent', () => {
  let component: CollectPlacesComponent;
  let fixture: ComponentFixture<CollectPlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollectPlacesComponent],
      imports: [HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render create-collection component by default', () => {

  })

  it('should render places-collection component when url has collectionId queryParam', () => {

  })

  it('should add search condition when user click add button', () => {

  })

  it('should call create search conditions in database when user click submit button', () => {

  })
});
