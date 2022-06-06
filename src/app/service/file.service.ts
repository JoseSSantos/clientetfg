import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { API_URL, httpOptions, uploadHttpOptions } from "src/environments/environment";
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { IFile } from "../model/file-interface";

@Injectable({
    providedIn: 'root'
})
export class FileService {

    constructor(private http: HttpClient) { }

    sURL = API_URL + '/file';

    uploadImage(imageFile: IFile): Observable<IFile> {

        return this.http.post<IFile>(this.sURL, imageFile, httpOptions);
    }
    getFileById(id:number): Observable<IFile>{
        return this.http.get<IFile>(this.sURL+'/'+id, httpOptions)
    }
}