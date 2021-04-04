import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AdminComponent } from './admin/admin.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { ManageOrderDetailComponent } from './manage-order-detail/manage-order-detail.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ManageProductCreateComponent } from './manage-product-create/manage-product-create.component';
import { ManageProductUpdateComponent } from './manage-product-update/manage-product-update.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
        { path: '', component: AdminComponent },
        { path: 'users', component: ManageUsersComponent },
        { path: 'orders', component: ManageOrdersComponent },
        { path: 'order-detail/:id', component: ManageOrderDetailComponent },
        { path: 'products', component: ManageProductsComponent },
        { path: 'product-create', component: ManageProductCreateComponent },
        { path: 'product-update/:id', component: ManageProductUpdateComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
