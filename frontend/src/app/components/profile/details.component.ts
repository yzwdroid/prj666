import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Customer } from 'src/app/model/Customer';


@Component({ templateUrl: 'details.component.html' })
export class DetailsComponent {
    customer: Customer

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
      var id = JSON.parse(localStorage.getItem('user')).user.customer_id;
      this.authService.getCustomerById(id).subscribe(data =>{
        if(data){
          this.customer = data;
        }
      });

    }
}
