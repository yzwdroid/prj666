import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../service/order.service';
import { environment } from '../../../../environments/environment';
import { Product } from '../../../model/Product';

@Component({
  selector: 'app-manage-order-detail',
  templateUrl: './manage-order-detail.component.html',
  styleUrls: ['./manage-order-detail.component.css'],
})
export class ManageOrderDetailComponent implements OnInit {
  order_details: any;
  products: Array<Product> = [];
  product: Product;
  apiPicUrl: string = environment.apiUrl + "/pictures";

  constructor(private orderService: OrderService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.orderService.getOrderDetail(params['id']).subscribe((data) => {
        console.log(data);
        this.order_details = data;
        this.products = data.products
        console.log(this.products);
      });
    });
  }
}
