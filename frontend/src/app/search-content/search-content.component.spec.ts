import { ChartsModule } from 'ng2-charts';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsScatterComponent } from './../charts-scatter/charts-scatter.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { ChartsLineComponent } from './../charts-line/charts-line.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SearchNoresultComponent } from './../search-noresult/search-noresult.component';
import { PlaceDetailComponent } from './../place-detail/place-detail.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchContentComponent } from './search-content.component';
import { SearchSummaryComponent } from '../search-summary/search-summary.component';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { SearchResultsJsonComponent } from '../search-results-json/search-results-json.component';

describe('SearchContentComponent', () => {
  let component: SearchContentComponent;
  let fixture: ComponentFixture<SearchContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchContentComponent, SearchSummaryComponent, SearchResultsComponent, SearchResultsJsonComponent, PlaceDetailComponent,
        SearchNoresultComponent, ChartsLineComponent, ChartsScatterComponent],
      imports: [
        MatProgressSpinnerModule, MatCardModule, MatExpansionModule, MatTooltipModule,
        MatIconModule, MatBadgeModule, MatChipsModule, ReactiveFormsModule, MatInputModule,
        MatAutocompleteModule, MatTableModule, MatPaginatorModule, ChartsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
