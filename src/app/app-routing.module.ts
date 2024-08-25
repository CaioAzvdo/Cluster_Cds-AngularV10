import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AdminComponent} from "./admin/admin.component";
import {UserComponent} from "./user/user.component";
import {LoginComponent} from "./login/login.component";
import {ForbiddenComponent} from "./forbidden/forbidden.component";
import {AuthGuard} from "./_auth/auth.guard";
import {ItemEditComponent} from "./item-edit/item-edit.component";
import {ItemListComponent} from "./item-list/item-list.component";

const routes: Routes = [{path: 'home', component: HomeComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: {role: 'ADMIN'}},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard], data: {role: 'USER'}},
  {path: 'login', component: LoginComponent},
  {path: 'forbidden', component: ForbiddenComponent},
  {path: 'item_edit', component: ItemEditComponent},
  {path: 'item-list', component: ItemListComponent },
  {path: 'item-edit/:id', component: ItemEditComponent },
  //{path: '', redirectTo: '/item-list', pathMatch: 'full' }
  {path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
