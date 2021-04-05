import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Customer } from 'src/app/model/Customer';
import { OrderService } from '../../service/order.service';
import { Order } from '../../model/Order';

@Component({ templateUrl: 'details.component.html' })
export class DetailsComponent {
    customer: Customer
    orders: Array<Order> = [];
    constructor(private authService: AuthService, private data: OrderService) {}

    ngOnInit(): void {
      var id = JSON.parse(localStorage.getItem('user')).user.customer_id;
      this.authService.getCustomerById(id).subscribe(data =>{
        if(data){
          this.customer = data;
          console.log(this.customer.email + "workks")
        }
      });

  }
}
