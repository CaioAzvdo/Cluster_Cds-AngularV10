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
  token: string = '';
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
    console.log(editForm.value);
    const itemId = this.route.snapshot.paramMap.get('id');
    console.log(this.itemService.editItemById(editForm.value, this.token, itemId));
    this.itemService.editItemById(editForm.value, this.token, itemId ).subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigate(['/item-list']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
