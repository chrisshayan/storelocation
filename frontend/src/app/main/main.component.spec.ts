import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ChartsScatterComponent } from './../charts-scatter/charts-scatter.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { ChartsLineComponent } from './../charts-line/charts-line.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SearchNoresultComponent } from './../search-noresult/search-noresult.component';
import { SearchResultsComponent } from './../search-results/search-results.component';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchContentComponent } from './../search-content/search-content.component';
import { SearchBoxComponent } from './../search-box/search-box.component';
import { PlacesCardComponent } from './../places-card/places-card.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { SearchSummaryComponent } from '../search-summary/search-summary.component';
import { PlaceDetailComponent } from '../place-detail/place-detail.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainComponent, PlacesCardComponent, SearchBoxComponent, SearchContentComponent, SearchSummaryComponent,
        SearchResultsComponent, PlaceDetailComponent, SearchNoresultComponent, ChartsLineComponent, ChartsScatterComponent],
      imports: [MatGridListModule, ReactiveFormsModule, MatAutocompleteModule, MatInputModule, MatTooltipModule,
        MatIconModule, MatSliderModule, MatSlideToggleModule, MatCardModule, MatProgressSpinnerModule, MatExpansionModule,
        MatBadgeModule, MatChipsModule, MatTableModule, MatPaginatorModule, ChartsModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
