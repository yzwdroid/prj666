import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//const BASEURL = 'http://localhost:3000/api/resetpassword';
const BASEURL = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  registerUser(body: any): Observable<any> {
    //return this.http.post(`${BASEURL}/register`, body);
    return this.http.post(`${BASEURL}/customer/register`, body);
  }

  loginUser(body: any): Observable<any> {
    console.log(body);
    return this.http.post(`${BASEURL}/customer/login`, body);
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
}
