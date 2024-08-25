import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserAuthService} from "./user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }
  path_to_api = 'http://localhost:8080/';
  requestHeader = new HttpHeaders({
    'No-Auth': 'True'
  });
  getItems(): Observable<any[]>{
    return this.http.get<any[]>(this.path_to_api + 'cd/listAll');
  }
  getItemById(id: number): Observable<any>{
    return this.http.get<any>(this.path_to_api + 'cd/' + id);
  }
  deleteItemById(id: number, token: string): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
      return this.http.delete<any>(this.path_to_api + 'cd/delete/' + id, { headers });
  }

}
