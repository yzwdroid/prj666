import { Component, OnInit } from '@angular/core';
import { Order } from '../../../model/Order';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../service/order.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css'],
})
export class ManageOrdersComponent implements OnInit {
  orders: Array<Order> = [];

  constructor(private data: OrderService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.data.getAll().subscribe((data) => (this.orders = data));
    if (this.orders) {
      console.log('Order are found!');
    } else {
      console.log('No Order!');
    }
  }
}
