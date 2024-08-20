import { Component, OnInit } from '@angular/core';
import {UserService} from "../_services/user.service";
import {NgForm} from "@angular/forms";
import {UserAuthService} from "../_services/user-auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService,
              private userAuth: UserAuthService,
              private router: Router) { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  login(loginForm: NgForm) {
    // @ts-ignore
    this.userService.loginSubmit(loginForm.value).subscribe(
      (response: any) =>
      {//console.log(response.token);
       //console.log(response.role);
       this.userAuth.setToken(response.token);
       this.userAuth.setRoles(response.role);

       const role = response.role;

       if (role === 'ADMIN'){
          this.router.navigate(['/admin']); }
       else{
          this.router.navigate(['/user']);
       }


       },
      (error) => {
        console.log(error);

      }
    );
  }
}
