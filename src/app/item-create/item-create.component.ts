import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ItemService} from "../_services/item.service";
import {UserAuthService} from "../_services/user-auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent implements OnInit {
  item: any = {};
  token = '';
  constructor(private itemService: ItemService,
              private userAuthService: UserAuthService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.token = this.userAuthService.getToken();
  }
  registerItem(registerForm: NgForm): void {
    console.log(registerForm.value);
    console.log(this.token);
    this.itemService.registerItem(registerForm.value, this.token).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      });
    const role: string[] = this.userAuthService.getRoles();
    if (role.includes('ADMIN')){
      this.router.navigate(['/admin']);
    } else if (role.includes('USER')){
      this.router.navigate(['/user']);
    }

  }

}
