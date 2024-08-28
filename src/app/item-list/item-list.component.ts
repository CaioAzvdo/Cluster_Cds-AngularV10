import { Component, OnInit } from '@angular/core';
import {ItemService} from "../_services/item.service";
import {UserAuthService} from "../_services/user-auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
items: any[] = [];
  constructor(private itemService: ItemService,
              private userAuthService: UserAuthService,
              private router: Router){ }

  ngOnInit(): void {
    this.itemService.getItems().subscribe((data) => {
      this.items = data;
      console.log(data);
    });
  }
  deleteItem(id: number){
    this.itemService.deleteItemById(id, this.userAuthService.getToken()).subscribe((data) => {
      this.items = this.items.filter(item => item.id !== id);
      alert('Item deleted');
    });
  }
  editItem(id: number){
    this.router.navigate(['/item-edit', id]);
  }
  public isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }

}
