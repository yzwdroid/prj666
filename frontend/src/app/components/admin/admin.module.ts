import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { AdminComponent } from './admin/admin.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ManageOrderDetailComponent } from './manage-order-detail/manage-order-detail.component';
import { ManageProductCreateComponent } from './manage-product-create/manage-product-create.component';


@NgModule({
  declarations: [
    LayoutComponent,
    AdminComponent,
    ManageUsersComponent,
    ManageOrdersComponent,
    ManageProductsComponent,
    ManageOrderDetailComponent,
    ManageProductCreateComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
