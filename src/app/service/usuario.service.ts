import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { API_URL, environment, httpOptions } from 'src/environments/environment';


import { catchError, retry, shareReplay, tap } from 'rxjs/operators';
import {  IUsuario, IUsuario2Send, IUsuarioPage } from '../model/usuario-interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  sURL = API_URL + '/usuario';

   getPage(rpp: number, page: number, order: string, direction: string, filter: string): Observable<IUsuarioPage> {
     let strOrderUrl: string = "";
     let filterStr: string = "";
     console.log("getpage");
     if (order) {
       strOrderUrl += "&sort=" + order + "," + direction;
     }
     if (filter) {
       filterStr += "&filter=" + filter;
     }
     page--;
     return this.http.get<IUsuarioPage>(this.sURL + "/page" + "?size=" + rpp + "&page=" + page + strOrderUrl + filterStr, httpOptions);
   }

  getPageFiltered(rpp: number, page: number, order: string, direction: string, equipo: number, filtertype: string): Observable<IUsuarioPage> {
    let strOrderUrl: string = "";
    let filterStr: string = "";
    console.log("getpagef")
    if (order) {
      strOrderUrl += "&sort=" + order + "," + direction;
    }
    if (filtertype) {
      filterStr += "&filter=" + filtertype;
    }
    page--;
    return this.http.get<IUsuarioPage>(this.sURL + "/page" + "?size=" + rpp + "&page=" + page + strOrderUrl + filterStr + "&equipo=" + equipo, httpOptions);
  }
  getPageWOEquipo(rpp: number, page: number, order: string, direction: string, equipo: number, filtertype: string):Observable<IUsuarioPage>{

    let strOrderUrl: string = "";
    let filterStr: string = "";
    console.log("getpagef")
    if (order) {
      strOrderUrl += "&sort=" + order + "," + direction;
    }
    if (filtertype) {
      filterStr += "&filtertype=" + filtertype;
    }
    page--;
    return this.http.get<IUsuarioPage>(this.sURL + "/page" + "?size=" + rpp + "&page=" + page + strOrderUrl + filterStr, httpOptions);
  
  }


  getOne(id: number): Observable<IUsuario> {
    return this.http.get<IUsuario>(this.sURL + "/" + id, httpOptions);
  }

  newOne(oUsuario: IUsuario2Send): Observable<IUsuario> {
    return this.http.post<IUsuario>(this.sURL + "/new", oUsuario, httpOptions);
  }

  updateOne(oUsuario: IUsuario2Send): Observable<number> {
    console.log(oUsuario)
    return this.http.put<number>(this.sURL + "/" + oUsuario.id, oUsuario, httpOptions);
  }
  updateRange(oUsuario: IUsuario): Observable<number> {
    return this.http.put<number>(this.sURL + "/" + oUsuario.id, oUsuario, httpOptions);
  }

  removeOne(id: number): Observable<number> {
    return this.http.delete<number>(this.sURL + "/" + id, httpOptions);
  }


}
