// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.


export const API_URL: string = "http://localhost:8082";

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8',
  }),
  withCredentials: true
};
export const httpOptions2 = {
  headers: new HttpHeaders({
    "Accept-Language": "es-ES,es;q=0.9",
}),
};

export const uploadHttpOptions = {
  //headers: new HttpHeaders({
    //'Content-Type': 'multipart/form-data'

    //'Content-Type': undefined

  //}),
  //reportProgress: true,
  withCredentials: true
};




