import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Customer } from 'src/app/model/Customer';
import { Order } from '../../../model/Order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent implements OnInit {

  customer: Customer
  orders: Array<Order> = [];
  constructor(private authService: AuthService, private data: OrderService ) { }

  ngOnInit(): void {
      var id = JSON.parse(localStorage.getItem('user')).user.customer_id;
      this.authService.getCustomerById(id).subscribe(data =>{
        if(data){
          this.customer = data;
          console.log(this.customer.email +' Order are found!');
        }
      });
  // this.data.getAllByCustomer(this.customer.customer_id).subscribe((data) => (this.orders = data));
  //   if (this.orders) {
  //     console.log('Order are found!');
  //   } else {
  //     console.log('No Order!');
  //   }
    this.data.getAll().subscribe((data) => (this.orders = data));
    if (this.orders) {
      console.log('Order are found!');
    } else {
      console.log('No Order!');
    }
  }

}
