import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ChartsScatterComponent } from './../charts-scatter/charts-scatter.component';
import { MatBadgeModule } from '@angular/material/badge';
import { ChartsLineComponent } from './../charts-line/charts-line.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { SearchNoresultComponent } from './../search-noresult/search-noresult.component';
import { SearchResultsComponent } from './../search-results/search-results.component';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchContentComponent } from './../search-content/search-content.component';
import { SearchBoxComponent } from './../search-box/search-box.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesCardComponent } from './places-card.component';
import { SearchSummaryComponent } from '../search-summary/search-summary.component';
import { PlaceDetailComponent } from '../place-detail/place-detail.component';

describe('PlacesCardComponent', () => {
  let component: PlacesCardComponent;
  let fixture: ComponentFixture<PlacesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlacesCardComponent, SearchBoxComponent, SearchContentComponent, SearchSummaryComponent,
        SearchResultsComponent, PlaceDetailComponent, SearchNoresultComponent, ChartsLineComponent, ChartsScatterComponent],
      imports: [ReactiveFormsModule, MatInputModule, MatAutocompleteModule, MatIconModule, MatTooltipModule,
        MatSliderModule, MatSlideToggleModule, MatCardModule, MatChipsModule, MatProgressSpinnerModule, MatExpansionModule, MatBadgeModule,
        MatTableModule, MatPaginatorModule, ChartsModule, HttpClientModule]
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
