import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AdminComponent } from './admin/admin.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ManageProductCreateComponent } from './manage-product-create/manage-product-create.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
        { path: '', component: AdminComponent },
        { path: 'users', component: ManageUsersComponent },
        { path: 'orders', component: ManageOrdersComponent },
        { path: 'order-detail', component: ManageOrdersComponent },
        { path: 'products', component: ManageProductsComponent },
        { path: 'product-create', component: ManageProductCreateComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
