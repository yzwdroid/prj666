import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const BASEURL = environment.apiUrl;

@Injectable()
export class CheckoutService {
  constructor(private http: HttpClient) {}

  postCheckoutInfo(body: any): Observable<any> {
    return this.http.post(`${BASEURL}/order`, body);
  }
}
