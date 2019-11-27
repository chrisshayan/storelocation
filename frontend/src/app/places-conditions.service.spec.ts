import { TestBed } from '@angular/core/testing';

import { PlacesConditionsService } from './places-conditions.service';

describe('PlacesConditionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlacesConditionsService = TestBed.get(PlacesConditionsService);
    expect(service).toBeTruthy();
  });
});
