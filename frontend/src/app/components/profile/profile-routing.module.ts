import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { DetailsComponent } from './details.component';
import { UpdateComponent } from './update.component';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: DetailsComponent },
            { path: 'orders', component: CustomerOrdersComponent },
            { path: 'detail', component: OrderDetailComponent },
            { path: 'update', component: UpdateComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }
