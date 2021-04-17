import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Customer } from 'src/app/model/Customer';
import { Order } from '../../../model/Order';
import { OrderService } from 'src/app/service/order.service';
import * as moment from 'moment';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['../../signin/signin.component.css'],
})
export class CustomerOrdersComponent implements OnInit {
  customer: Customer;
  orders: Array<Order> = [];
  constructor(private authService: AuthService, private data: OrderService) {}

  ngOnInit(): void {
    var id = JSON.parse(localStorage.getItem('user')).user.customer_id;
    this.authService.getCustomerById(id).subscribe((data) => {
      if (data) {
        this.customer = data;
        console.log(this.customer.email + ' Order are found!');
        console.log(this.customer);
        this.data
          .getAllByCustomer(this.customer.customer_id)
          .subscribe((data: Array<Order>) => {
            data.forEach((order) => {
              order.order_date = moment(order.order_date).format(
                'MMMM Do YYYY, h:mm a'
              );
            });
            this.orders = data;
          });
      }
    });

    //   this.data.getAll().subscribe((data) => (this.orders = data));
    //   if (this.orders) {
    //     console.log('Order are found!');
    //   } else {
    //     console.log('No Order!');
    //   }
    // }
  }
}
