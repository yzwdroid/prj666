import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments//environment';

const BASEURL = environment.apiUrl;

@Injectable()
export class AddressService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<any> {
    return this.http.get(`${BASEURL}/address`);
  }

  public getOne(id): Observable<any> {
    return this.http.get(`${BASEURL}/address/${id}`);
  }

  create(body: any): Observable<any> {
    return this.http.post(`${BASEURL}/address`, body);
  }

  update(id, body): Observable<any> {
    return this.http.post(`${BASEURL}/address/${id}`, body);
  }
}
