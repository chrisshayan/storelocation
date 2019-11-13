import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsJsonComponent } from './search-results-json.component';
import { JsonViewerComponent } from '../json-viewer/json-viewer.component';

describe('SearchResultsJsonComponent', () => {
  let component: SearchResultsJsonComponent;
  let fixture: ComponentFixture<SearchResultsJsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultsJsonComponent, JsonViewerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
