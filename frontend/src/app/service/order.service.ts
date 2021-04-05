import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments//environment';

const BASEURL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<any> {
    return this.http.get(`${BASEURL}/order`);
  }
  public getAllByCustomer(id): Observable<any> {
    let params = {
     customerid :id,
    };
    return this.http.get(`${BASEURL}/order`, { params });
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

  public changeOrderStatus(id, value): Observable<any> {
    return this.http.post(`${BASEURL}/order/status/${id}`, {
      order_status: value,
    });
  }
}
