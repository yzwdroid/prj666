import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';

//import { AddUserComponent } from './manage-users/add-user/add-user.component';
//import { ViewUserComponent } from './manage-users/view-user/view-user.component';



@NgModule({
  declarations: [AdminComponent, ManageUsersComponent, ManageOrdersComponent, ManageProductsComponent],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
