import { PlacesConditionsService } from './../places-conditions.service';
import { MatTableDataSource } from '@angular/material/table';
import { PlaceAutocompleteService } from './../place-autocomplete.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import _ from 'underscore'

export interface Condition {
  // position: number
  id: string
  name?: string
  radius: number
}

@Component({
  selector: 'collect-places',
  templateUrl: './collect-places.component.html',
  styleUrls: ['./collect-places.component.css']
})
export class CollectPlacesComponent implements OnInit {

  minRadius: number = 5
  maxRadius: number = 500
  radiusToolTip: string = "Defines the distance (in meters) within which to return place results. \
    The maximum allowed radius is 500 meters. Default is 50 meters."

  conditionForm: FormGroup
  emailMeForm: FormGroup
  conditions
  predictions = []
  options = []

  displayedColumns: string[] = ['id', 'name', 'radius', 'action']
  dataSource: MatTableDataSource<Condition>

  messages: string[] = []

  constructor(fb: FormBuilder, private autocompleteService: PlaceAutocompleteService, private conditionsService: PlacesConditionsService) {
    this.conditionForm = fb.group({
      search: ['', Validators.required],
      radius: [50]
    })
    this.emailMeForm = fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
    this.conditions = new Set()
  }

  ngOnInit() {

  }

  autocomplete($event) {
    const { search: input } = this.conditionForm.value
    if ($event.keyCode !== 13 && input.length > 2) {
      this.autocompleteService.predict(input).subscribe(predict => {
        this.predictions = predict
        this.options = predict.map(p => p.name)
      })
    }
    return []
  }

  addCondition() {
    const condition = this.getCondition()
    this.conditions.add(condition)
    return this.updateConditions()
  }

  updateConditions() {
    const data = Array.from(this.conditions).map((c: string) => JSON.parse(c))
    this.dataSource = new MatTableDataSource(data)

    return this.conditionForm.setValue({ search: '', radius: 50 })
  }

  getCondition() {
    const { search, radius } = this.conditionForm.value
    const { id, name } = this.getPlaceInfo(search)
    return JSON.stringify({ id, name, radius })
  }

  removeCondition(condition) {
    this.conditions.delete(JSON.stringify(condition))
    return this.updateConditions()
  }

  emailMe() {
    const { email } = this.emailMeForm.value
    console.log('email the conditions: ', this.conditions)
    console.log('to email: ', email)

    if (!_.isEmpty(email)) {
      this.conditionsService.create(Array.from(this.conditions), email).subscribe(response => {
        console.log('response: ', response)
        if (!_.isEmpty(response)) {
          if (!_.isEmpty(response.id)) {
            this.messages.push('The search results will be sent to your email address after we finished collecting data.')
          }
        }
      })
    } else {
      this.messages.push('Please enter the email address!!!')
      console.log('message', this.messages)
    }
  }

  getPlaceInfo(search) {
    let id = search
    let name = ''
    const place = this.predictions.filter(p => p.name === search)
    if (!_.isEmpty(place)) {
      id = place[0].id
      name = place[0].name
    }
    return { id, name }
  }

  get search() {
    return this.conditionForm.get('search')
  }

  get showConditions() {
    return !_.isEmpty(Array.from(this.conditions))
  }

  get email() {
    // console.log('email: ', this.emailMeForm.get('email'))
    return this.emailMeForm.get('email')
  }
}
