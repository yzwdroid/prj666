import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../service/order.service';
import { environment } from '../../../../environments/environment';
import { Product } from '../../../model/Product';
import * as moment from 'moment';

@Component({
  selector: 'app-manage-order-detail',
  templateUrl: './manage-order-detail.component.html',
  styleUrls: ['./manage-order-detail.component.css'],
})
export class ManageOrderDetailComponent implements OnInit {
  order_details: any;
  products: Array<Product> = [];
  product: Product;
  apiPicUrl: string = environment.apiUrl + '/pictures';
  order_status: Array<string> = [
    'Placed',
    'Production',
    'Packing',
    'Shipped',
    'Complete',
    'Cancelled',
  ];

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.orderService.getOrderDetail(params['id']).subscribe((data) => {
        data.order_date = moment(data.order_date).format('MMMM Do YYYY, h:mm a');
        this.order_details = data;
        return this.products = data.products;
      });
    });
  }

  changeOrderStatus(order_id, value) {
    this.orderService.changeOrderStatus(order_id, value).subscribe(
      (data) => {},
      (err) => {
        console.log(err);
      }
    );
  }
}
