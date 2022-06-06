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
import { ITipoUsuarioPage, ITipoUsuario } from '../model/tipousuario-interfaces';

@Injectable({
  providedIn: 'root',
})
export class TipousuarioService {
  constructor(private http: HttpClient, private oRoute: Router) {}

  sURL = API_URL + '/tipo';

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

  view(id: number): Observable<ITipoUsuario> {
    return this.http
      .get<ITipoUsuario>(`${this.sURL}/${id}`, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getPage(
    rpp: number,
    page: number,
    filter: string,
    order: string,
    direction: string
  ): Observable<ITipoUsuarioPage> {
    let strUrl: string = '';
    if (filter) {
      strUrl += '&filter=' + filter;
    }
    if (order) {
      strUrl += '&sort=' + order + ',' + direction;
    }
    return this.http.get<ITipoUsuarioPage>(
      this.sURL + '/page?page=' + (page - 1) + '&size=' + rpp + strUrl,
      httpOptions
    );
  }

  edit(body: String): Observable<ITipoUsuario> {
    return this.http
      .put<ITipoUsuario>(this.sURL, body, httpOptions)
      .pipe(catchError(this.handleError));
  }
  postJsonFormater(formPost: FormGroup): string {
    let data: any = {};
    Object.keys(formPost.controls).forEach((key) => {
      data[key] = formPost.controls[key].value;
    });
    return JSON.stringify(data);
  }

  redirectPlist(): void {
    this.oRoute.navigate(['/tipousuario/plist']);
  }
}
