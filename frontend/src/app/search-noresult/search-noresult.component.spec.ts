import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNoresultComponent } from './search-noresult.component';

describe('SearchNoresultComponent', () => {
  let component: SearchNoresultComponent;
  let fixture: ComponentFixture<SearchNoresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchNoresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchNoresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
