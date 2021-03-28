/*import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../../../../service/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  //selector: 'app-add-user',
  templateUrl: './add-user.component.html'
  //,
  //styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  account = JSON.parse(localStorage.getItem('user')).user;//this.accountService.userValue;
    form: FormGroup;
    loading = false;
    submitted = false;
    deleting = false;

  constructor() {
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    //private alertService: AlertService
  }

  ngOnInit(){

    this.form = this.formBuilder.group({
      first_name: [this.account.first_name, Validators.required],
      last_name: [this.account.last_name, Validators.required],
      email: [this.account.email, [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
      confirm_password: ['']
  }, {
      //validator: MustMatch('password', 'confirmPassword')
  });
  }

   // convenience getter for easy access to form fields
   get f() { return this.form.controls; }

   onSubmit() {
       this.submitted = true;

       // reset alerts on submit
       //this.alertService.clear();

       // stop here if form is invalid
       if (this.form.invalid) {
           return;
       }

       this.loading = true;
       this.authService.updateUser(this.account.customer_id, this.form.value)
           .pipe(first())
           .subscribe({
               next: () => {
                   //this.alertService.success('Update successful', { keepAfterRouteChange: true });
                   this.router.navigate(['../'], { relativeTo: this.route });
               },
               error: error => {
                   //this.alertService.error(error);
                   this.loading = false;
               }
           });

}
*/


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { Customer } from '../../../model/Customer';

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
