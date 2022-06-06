
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
import { IPartido, IPartido2Send, IPartidoNew, IPartidoPage } from '../model/partido-interfaces';

@Injectable({
  providedIn: 'root',
})
export class PartidoService {
  constructor(private http: HttpClient, private oRoute: Router) {}

  sURL = API_URL + '/partido';

//   view(id: number): Observable<IPartido> {
//     return this.http
//       .get<IPartido>(`${this.sURL}/${id}`, httpOptions)
//       .pipe(catchError(this.handleError));
//   }

  getOne(id: number): Observable<IPartido> {
    return this.http.get<IPartido>(this.sURL + "/" + id, httpOptions);
  }

  newOne(oEquipo: IPartido2Send): Observable<IPartido> {
    return this.http.post<IPartido>(this.sURL + "/new", oEquipo, httpOptions);
  }
  newOneA(oEquipo: IPartidoNew):Observable<IPartido> {
    return this.http.post<IPartido>(this.sURL + "/new", oEquipo, httpOptions);
  }

  updateOne(oEquipo: IPartido2Send): Observable<number> {
    return this.http.put<number>(this.sURL + "/" + oEquipo.id, oEquipo, httpOptions);
  }

  removeOne(id: number): Observable<number> {
    return this.http.delete<number>(this.sURL + "/" + id, httpOptions);
  }
  getPage(rpp: number, page: number, order: string, direction: string, filter: string): Observable<IPartidoPage> {
    let strOrderUrl: string = "";
    let filterStr: string = "";
    if (order) {
      strOrderUrl += "&sort=" + order + "," + direction;
    }
    if (filter) {
      filterStr += "&filter=" + filter;
    }
    page--;
    return this.http.get<IPartidoPage>(this.sURL + "/page" + "?size=" + rpp + "&page=" + page + strOrderUrl + filterStr, httpOptions);
  }
}