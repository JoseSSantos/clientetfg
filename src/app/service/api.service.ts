import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { API_URL, environment, httpOptions2 } from 'src/environments/environment';

import { catchError, retry, shareReplay, tap } from 'rxjs/operators';
import {  IUsuario, IUsuario2Send, IUsuarioPage } from '../model/usuario-interfaces';
import { IApi1, IApi2 } from '../model/API-interfaces';
//import { request } from 'http';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) { 
  }

  key:string = "RGAPI-2b103ffe-5871-4855-bbc4-86920cd5d2ca"

  getAPI1(summonername:string):Observable<IApi1>{
    return this.http.get<IApi1>('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+
    summonername+'?api_key='+this.key,httpOptions2);
  }

  getAPI2(accountid:string):Observable<IApi2[]>{
    return this.http.get<IApi2[]>('https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/'+
    accountid+'?api_key='+this.key,httpOptions2);
  }

}