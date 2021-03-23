import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../service/auth.service';
import { Customer } from '../../model/Customer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  customers: Array<Customer>

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getCustomers().subscribe(data => {
      if (data.length > 0) {
        this.customers = data;
      }
    });
  }

}
