import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments//environment';

const BASEURL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<any> {
    return this.http.get(`${BASEURL}/order`);
  }

  public getOrders(page): Observable<any> {
    const perPage = 9;

    let params = {
      page: page,
      perPage: perPage.toString(),
    };

    console.log(params);

    return this.http.get(`${BASEURL}/order`, { params });
  }

  public getOrderDetail(id): Observable<any> {
    return this.http.get(`${BASEURL}/order_detail/${id}`);
  }
}
