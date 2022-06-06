import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  API_URL,
  environment,
  httpOptions,
} from 'src/environments/environment';
import { IEquipo, IEquipoPage } from '../model/equipo-interfaces';

@Injectable({
  providedIn: 'root',
})
export class EquipoService {
  constructor(private http: HttpClient, private oRoute: Router) {}

  sURL = API_URL + '/equipo';

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
      if (environment) console.log('SessionService: error: ' + errorMessage);
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (environment) console.log('SessionService: error: ' + errorMessage);
    }
    return throwError(errorMessage);
  }

  view(id: number): Observable<IEquipo> {
    return this.http
      .get<IEquipo>(`${this.sURL}/${id}`, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getOne(id: number): Observable<IEquipo> {
    return this.http.get<IEquipo>(this.sURL + "/" + id, httpOptions);
  }

  newOne(oEquipo: IEquipo): Observable<IEquipo> {
    return this.http.post<IEquipo>(this.sURL + "/new", oEquipo, httpOptions);
  }

  getAll():Observable<IEquipo[]>{

    return this.http.get<IEquipo[]>(this.sURL+"/all",httpOptions);
  }

  updateOne(oEquipo: IEquipo): Observable<number> {
    return this.http.put<number>(this.sURL + "/" + oEquipo.id, oEquipo, httpOptions);
  }

  removeOne(id: number): Observable<number> {
    return this.http.delete<number>(this.sURL + "/" + id, httpOptions);
  }
  getPage(rpp: number, page: number, order: string, direction: string, filter: string): Observable<IEquipoPage> {
    let strOrderUrl: string = "";
    let filterStr: string = "";
    if (order) {
      strOrderUrl += "&sort=" + order + "," + direction;
    }
    if (filter) {
      filterStr += "&filter=" + filter;
    }
    page--;
    return this.http.get<IEquipoPage>(this.sURL + "/page" + "?size=" + rpp + "&page=" + page + strOrderUrl + filterStr, httpOptions);
  }


}