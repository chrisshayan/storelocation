import { Observable, from } from 'rxjs';
import { CollectPlacesService } from './../collect-places.service';
import { CollectPlacesComponent } from './collect-places.component';
import { } from 'jasmine';

describe('CollectPlacesComponentUnit', () => {
  let component: CollectPlacesComponent
  let service: CollectPlacesService

  beforeEach(() => {
    service = new CollectPlacesService(null)
    component = new CollectPlacesComponent(service)
  })

  it('should set the places collection property with the items returned from the server', () => {
    let placesCollection = [
      { id: '', places: [] }
    ]
    spyOn(service, 'getPlacesCollection').and.callFake(collectionId => {
      return from([placesCollection])
    })

    component.ngOnInit()

    expect(component.placesCollection.length).toBe(1)
  })
})