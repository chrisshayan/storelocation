import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { PlaceAutocompleteService } from './place-autocomplete.service';

describe('PlaceAutocompleteService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: PlaceAutocompleteService = TestBed.get(PlaceAutocompleteService);
    expect(service).toBeTruthy();
  });
});
