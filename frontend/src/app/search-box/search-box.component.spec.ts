import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBoxComponent } from './search-box.component';
import { MatIconModule } from '@angular/material/icon';

xdescribe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBoxComponent],
      imports: [ReactiveFormsModule, FormsModule, MatAutocompleteModule, MatInputModule, MatTooltipModule, MatIconModule,
        MatSliderModule, MatSlideToggleModule, MatAutocompleteModule, MatCardModule, MatAutocompleteModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
