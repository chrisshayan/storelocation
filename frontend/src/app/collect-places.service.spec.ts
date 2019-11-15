import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CollectPlacesService } from './collect-places.service';

describe('CollectPlacesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: CollectPlacesService = TestBed.get(CollectPlacesService);
    expect(service).toBeTruthy();
  });

  it('should call get places collection from database', () => {

  })

  it('should call creating search condition for getting places collection in database', () => {

  })


});
