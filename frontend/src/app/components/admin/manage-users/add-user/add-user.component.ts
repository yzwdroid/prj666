import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../service/auth.service';
import { Customer } from '../../../../model/Customer';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  customers: Array<Customer>
  router: any;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getCustomers().subscribe(data => {
      if (data.length > 0) {
        this.customers = data;
      }
    });
  }
  viewUser(email: string) {
    this.router.navigate(['admin', 'customers'], {queryParams: {email, action: 'view'}});
  }

}
