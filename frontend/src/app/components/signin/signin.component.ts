import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  SigninForm=new FormGroup({});
  forbiddenEmails: any;
  errorMessage: string | any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.buildSigninForm();
  }

  ngOnInit() {
  }

  private buildSigninForm() {
    this.SigninForm = this.fb.group({
      email: [null, [Validators.required, Validators.email], this.forbiddenEmails],
      password: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit() {
    this.SigninForm.reset();
  }

  signinUser() {
    this.authService.loginUser(this.SigninForm.value).subscribe(
      data => {
        this.SigninForm.reset();
        setTimeout(() => {
          this.router.navigate(['homepage'])
          .then(()=>{
            window.location.reload();
          });
        });
      },
      err => {
        if (err.error.msg) {
          this.errorMessage = err.error.msg[0].message;
        }
        if (err.error.message) {
          this.errorMessage = err.error.message;
        }
      }
    );
  }

}
