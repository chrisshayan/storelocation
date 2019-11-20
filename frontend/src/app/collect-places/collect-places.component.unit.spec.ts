import { } from 'jasmine';
import { CollectPlacesComponent } from './collect-places.component';
import { FormBuilder } from '@angular/forms';

describe('CollectPlacesComponentUnit', () => {

  let component: CollectPlacesComponent

  beforeEach(() => {
    component = new CollectPlacesComponent(new FormBuilder())
  })

  it('should create a conditionForm with 2 controls', () => {
    expect(component.conditionForm.contains('search')).toBeTruthy()
    expect(component.conditionForm.contains('radius')).toBeTruthy()
  })

  it('should create a emailMeForm with 1 controls', () => {
    expect(component.emailMeForm.contains('email')).toBeTruthy()
  })

  it('should make the search control is required', () => {
    let control = component.conditionForm.get('search')
    control.setValue('')
    expect(control.valid).toBeFalsy()
  })

  it('should make the email control is required', () => {
    let control = component.emailMeForm.get('email')
    control.setValue('')
    expect(control.valid).toBeFalsy()
  })

  it('should not accept wrong formatted email address in email control', () => {
    let control = component.emailMeForm.get('email')
    control.setValue('ab.com')
    expect(control.valid).toBeFalsy()
  })

  it('should accept formatted email address in email control', () => {
    let control = component.emailMeForm.get('email')
    control.setValue('email@example.com')
    expect(control.valid).toBeTruthy()
  })

})