import { SearchBoxComponent } from './search-box.component';
import { PlaceAutocompleteService } from '../place-autocomplete.service';
import { PlacesSearchService } from '../places-search.service';
import { SearchStateService } from '../search-state.service';
describe('SearchBoxComponentUnit', () => {
  let component: SearchBoxComponent

  beforeEach(() => {
    component = new SearchBoxComponent(new PlaceAutocompleteService(null), new PlacesSearchService(null), new SearchStateService())
  })

  it('should get placeId from the search form', () => {
    const query = 'Cửa Hàng Viễn Thông A'
    component.predictions = [{ id: 'ChIJp2mVyigpdTERCIa-SCQspCQ', name: 'Cửa Hàng Viễn Thông A', types: ['electronics_store', 'store'] }]
    expect(component.getSearchQuery('Cửa Hàng Viễn Thông A')).toBe('ChIJp2mVyigpdTERCIa-SCQspCQ')
  })
})