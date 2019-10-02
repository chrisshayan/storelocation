import { TestBed } from '@angular/core/testing';

import { SearchStateService } from './search-state.service';

describe('SearchStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchStateService = TestBed.get(SearchStateService);
    expect(service).toBeTruthy();
  });
});
