import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { PlacesSearchService } from './places-search.service';

describe('PlacesSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: PlacesSearchService = TestBed.get(PlacesSearchService);
    expect(service).toBeTruthy();
  });
});
