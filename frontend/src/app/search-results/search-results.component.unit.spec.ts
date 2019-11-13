import { SearchResultsComponent } from './search-results.component';
import { FormBuilder } from '@angular/forms';
describe('SearchResultsComponentUnit', () => {
  let component: SearchResultsComponent

  beforeEach(() => {
    component = new SearchResultsComponent(new FormBuilder())
  })

  it('should create filter form with 3 controls', () => {
    expect(component.filterForm.contains('rating')).toBeTruthy()
    expect(component.filterForm.contains('noOfRatings')).toBeTruthy()
    expect(component.filterForm.contains('noOfReviews')).toBeTruthy()
  })
})