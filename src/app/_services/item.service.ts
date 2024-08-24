import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

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

}
