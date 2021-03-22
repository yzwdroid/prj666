import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './../../environments//environment';
import { Router } from '@angular/router';
import { Customer } from '../model/Customer';
import { map } from 'rxjs/operators';

const BASEURL = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private router: Router,private http: HttpClient) {}

  registerUser(body: any): Observable<any> {
    return this.http.post(`${BASEURL}/customer/register`, body);
  }

  loginUser(body: any): Observable<any> {
    console.log(body);
    return this.http.post<Customer>(`${BASEURL}/customer/login`, body)
          .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        }));
  }

  logoutUser() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.router.navigate(['sign-in'])
    .then(()=>{
      window.location.reload();
    });
  }

  requestReset(body: any): Observable<any> {
    return this.http.post(`${BASEURL}/customer/req-reset-password`, body);
  }

  newPassword(body :any): Observable<any> {
    console.log(body);
    return this.http.post(`${BASEURL}/customer/new-password`, body);
  }

  ValidPasswordToken(body: any): Observable<any> {
    console.log(body);
    return this.http.post(`${BASEURL}/customer/valid-password-token`, body);
  }

  getCustomers(): Observable<any> {
    return this.http.get(`${BASEURL}/customer`);
    //return this.http.get(`${BASEURL}`);
  }

  getCustomerById(id: any): Observable<any> {
    return this.http.get(`${BASEURL}/customer/${id}`);
  }

  updateUser(id: any, user: any): Observable<any> {
    return this.http.put(`${BASEURL}/customer/update/${id}`, user)
    .pipe(map(u => {
      //localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(u));

      return u;
    }));
  }
}
