import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../signin/signin.component.css']

})
export class SignupComponent implements OnInit {
  SignupForm=new FormGroup({});
  forbiddenEmails: any;
  errorMessage: string | any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.buildSignupForm();
  }

  ngOnInit() {
  }

  private buildSignupForm() {
    this.SignupForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email], this.forbiddenEmails],
      password: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit() {
    this.SignupForm.reset();
  }

  signupUser() {
    this.authService.registerUser(this.SignupForm.value).subscribe(
      data => {
        this.SignupForm.reset();
        setTimeout(() => {
          this.router.navigate(['sign-in']);
        }, 3000);
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
