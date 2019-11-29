import { TestBed } from '@angular/core/testing';

import { PlacesCollectionService } from './places-collection.service';

describe('PlacesCollectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlacesCollectionService = TestBed.get(PlacesCollectionService);
    expect(service).toBeTruthy();
  });
});
