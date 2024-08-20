import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "./user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient,
              private userAuthService: UserAuthService) { }
  // tslint:disable-next-line:variable-name
  path_to_api = 'http://localhost:8080/';
  requestHeader = new HttpHeaders({
    'No-Auth': 'True'
  });

  // tslint:disable-next-line:typedef
  public loginSubmit(loginData: any){
    return this.httpClient.post(this.path_to_api + 'auth/login',
      loginData,
      {headers: this.requestHeader});
  }
  // tslint:disable-next-line:typedef
  public isAdmin(){
    // @ts-ignore
    return this.userAuthService.getRoles().includes('ADMIN');
  }



}

