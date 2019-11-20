import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectPlacesComponent } from './collect-places.component';

describe('CollectPlacesComponent', () => {
  let component: CollectPlacesComponent;
  let fixture: ComponentFixture<CollectPlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollectPlacesComponent],
      imports: [HttpClientModule, MatCardModule, MatGridListModule, ReactiveFormsModule, MatInputModule, MatIconModule, BrowserAnimationsModule]
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

  xit('should render create-collection component by default', () => {

  })

  xit('should render places-collection component when url has collectionId queryParam', () => {

  })

  xit('should add search condition when user click add button', () => {

  })

  xit('should call create search conditions in database when user click submit button', () => {

  })
});
