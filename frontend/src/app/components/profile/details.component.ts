import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Customer } from 'src/app/model/Customer';


@Component({ templateUrl: 'details.component.html' })
export class DetailsComponent {
    //customer: Customer
    customer = JSON.parse(localStorage.getItem('user')).user;//this.accountService.userValue;

    constructor(private authService: AuthService) {
      // this.customer = this.authService.userValue;
       console.log(this.customer);
      // console.log(this.customer.email);
    }
}
