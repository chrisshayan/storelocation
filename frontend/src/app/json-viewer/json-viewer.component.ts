import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'json-viewer',
  templateUrl: './json-viewer.component.html',
  styleUrls: ['./json-viewer.component.css']
})
export class JsonViewerComponent {

  // data = {
  //   'simple key': 'simple value',
  //   'numbers': 1234567,
  //   'simple list': ['value1', 22222, 'value3'],
  //   'special value': undefined,
  //   'owner': null,
  //   'simple obect': {
  //     'simple key': 'simple value',
  //     'numbers': 1234567,
  //     'simple list': ['value1', 22222, 'value3'],
  //     'simple obect': {
  //       'key1': 'value1',
  //       'key2': 22222,
  //       'key3': 'value3'
  //     }
  //   }
  // };
  @Input('data') data: {}

  get code() {
    return JSON.stringify(this.data, null, 2);
  }

  set code(v) {
    try {
      this.data = JSON.parse(v);
    }
    catch (e) {
      console.log('error occored while you were typing the JSON', e);
    };
  }

}
