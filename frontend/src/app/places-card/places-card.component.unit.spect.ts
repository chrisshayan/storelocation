import { FormBuilder } from '@angular/forms';
import { SearchStateService } from './../search-state.service';
import { PlacesCardComponent } from './places-card.component';
describe('PlacesCardComponentUnit', () => {
  let component: PlacesCardComponent
  let service: SearchStateService
  let fb: FormBuilder

  beforeEach(() => {
    service = new SearchStateService()
    fb = new FormBuilder()
    component = new PlacesCardComponent(fb, service)
  })
})