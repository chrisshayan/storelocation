import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSummaryComponent } from './search-summary.component';

describe('SearchSummaryComponent', () => {
  let component: SearchSummaryComponent;
  let fixture: ComponentFixture<SearchSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSummaryComponent ]
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
