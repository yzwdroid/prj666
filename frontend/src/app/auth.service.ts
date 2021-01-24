import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'http://localhost:3000/api/resetpassword';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  registerUser(body: any): Observable<any> {
    return this.http.post(`${BASEURL}/register`, body);
  }

  loginUser(body: any): Observable<any> {
    console.log(body);
    return this.http.post(`${BASEURL}/login`, body);
  }

  requestReset(body: any): Observable<any> {
    return this.http.post(`${BASEURL}/req-reset-password`, body);
  }

  newPassword(body :any): Observable<any> {
    return this.http.post(`${BASEURL}/new-password`, body);
  }

  ValidPasswordToken(body: any): Observable<any> {
    return this.http.post(`${BASEURL}/valid-password-token`, body);
  }
}
