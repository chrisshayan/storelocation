import { ChartsModule } from 'ng2-charts';
import { ChartsScatterComponent } from './../charts-scatter/charts-scatter.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { ChartsLineComponent } from './../charts-line/charts-line.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSummaryComponent } from './search-summary.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

xdescribe('SearchSummaryComponent', () => {
  let component: SearchSummaryComponent;
  let fixture: ComponentFixture<SearchSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchSummaryComponent, ChartsLineComponent, ChartsScatterComponent],
      imports: [MatExpansionModule, MatTooltipModule, MatIconModule, MatBadgeModule, MatChipsModule, ChartsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
