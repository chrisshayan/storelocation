import { } from 'jasmine';
import { FormBuilder } from '@angular/forms';
import { SearchStateService } from './../search-state.service';
import { PlacesCardComponent } from './places-card.component';

describe('PlacesCardComponentUnit', () => {
  let component: PlacesCardComponent

  beforeEach(() => {
    component = new PlacesCardComponent(new FormBuilder(), new SearchStateService())
  })

  it('should create search form with 4 controls', () => {
    expect(component.searchForm.contains('query')).toBeTruthy()
    expect(component.searchForm.contains('radius')).toBeTruthy()
    expect(component.searchForm.contains('typeFilter')).toBeTruthy()
    expect(component.searchForm.contains('opennowFilter')).toBeTruthy()
  })

  it('should make the query control required', () => {
    let control = component.searchForm.get('query')

    control.setValue('')

    expect(control.valid).toBeFalsy()
  })
})