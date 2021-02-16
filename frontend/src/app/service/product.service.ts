import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'http://localhost:8000/api';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<any> {
    return this.http.get(`${BASEURL}/product`);
  }

  public getOne(id): Observable<any> {
    return this.http.get(`${BASEURL}/product/${id}`);
  }

  public getProducts(page, category): Observable<any> {
    const perPage = 3;

    let params = {
      page: page,
      perPage: perPage.toString(),
    };

    if (category != null || category != undefined) {
      params['category'] = category;
    }

    console.log(params);

    return this.http.get(`${BASEURL}/product`, { params });
  }
}
