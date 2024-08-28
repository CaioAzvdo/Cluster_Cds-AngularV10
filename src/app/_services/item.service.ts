import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserAuthService} from "./user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient, private userAuthService: UserAuthService) {
  }

  path_to_api = 'http://localhost:8080/';
  requestHeader = new HttpHeaders({
    'No-Auth': 'True'
  });

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.path_to_api + 'cd/listAll');
  }

  getItemById(id: number): Observable<any> {
    return this.http.get<any>(this.path_to_api + 'cd/' + id);
  }

  deleteItemById(id: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
    const role: string[] = this.userAuthService.getRoles();
    if (role.includes('ADMIN')) {
      return this.http.delete<any>(this.path_to_api + 'admin/delete/' + id, {headers});
    } else if (role.includes('USER')) {
      return this.http.delete<any>(this.path_to_api + 'cd/delete/' + id, {headers});
    }
  }

  editItemById(editData: string, token: string, itemId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
    const role: string[] = this.userAuthService.getRoles();
    if (role.includes('ADMIN')) {
      return this.http.put<any>(this.path_to_api + 'admin/edit/' + itemId, editData, {headers});
      } else if (role.includes('USER')) {
      return this.http.put<any>(this.path_to_api + 'cd/edit/' + itemId, editData, {headers});
      }
  }
  registerItem(createData: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
    const role: string[] = this.userAuthService.getRoles();
    if (role.includes('ADMIN')) {
      return this.http.post<any>(this.path_to_api + 'admin/register', createData, {headers});
    } else if (role.includes('USER')) {
      return this.http.post<any>(this.path_to_api + 'cd/register', createData, {headers});
    }
  }
  isOwner(itemId: number, userId: string): boolean {
    return this.userAuthService.getUser() === userId;
  }
}
