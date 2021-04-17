import { Component, OnInit } from '@angular/core';
import { Order } from '../../../model/Order';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../service/order.service';
import * as moment from 'moment';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['../../signin/signin.component.css'],
})
export class ManageOrdersComponent implements OnInit {
  orders: Array<Order> = [];

  constructor(private data: OrderService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.data.getAll().subscribe((data: Array<Order>) => {
      data.forEach((order) => {
        order.order_date = moment(order.order_date).format(
          'MMMM Do YYYY, h:mm a'
        );
      });
      this.orders = data;
    });
    if (this.orders) {
      console.log('Order are found!');
    } else {
      console.log('No Order!');
    }
  }
}
