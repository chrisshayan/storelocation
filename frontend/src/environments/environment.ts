// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  gmapsPlaceRedirect: 'https://www.google.com/maps/place/?q=place_id:',
  apiUrl: 'http://localhost:5000/api/place',
  firebaseConfig: {
    apiKey: "AIzaSyCA2gEb2e7o5_yJD7wJpVkkNR3N06mguCM",
    authDomain: "storelocation-f9311.firebaseapp.com",
    databaseURL: "https://storelocation-f9311.firebaseio.com",
    projectId: "storelocation-f9311",
    storageBucket: "storelocation-f9311.appspot.com",
    messagingSenderId: "700070339454",
    appId: "1:700070339454:web:5509124221c6b1248ec92f",
    measurementId: "G-WM3JSYF0G8"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
