import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ItemService} from "../_services/item.service";
import {UserAuthService} from "../_services/user-auth.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  item: any = {};
  token = '';
  constructor(private itemService: ItemService,
              private userAuthService: UserAuthService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.token = this.userAuthService.getToken();
    const itemId = this.route.snapshot.paramMap.get('id');
    this.itemService.getItemById(Number(itemId)).subscribe(data => {
      this.item = data;
    });
  }
  editItem(editForm: NgForm): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    this.itemService.editItemById(editForm.value, this.token, itemId).subscribe(
      (response: any) => {
        const role: string[] = this.userAuthService.getRoles();
        if (role.includes('ADMIN')){
        this.router.navigate(['/admin']);
        } else if (role.includes('USER')){
          this.router.navigate(['/user']);
        }
      },
      (error) => {
        console.log(error);
      }
    );

  }
}
