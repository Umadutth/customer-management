import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environments';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  public baseurl: any;
  public user: string = 'users'
  constructor(public http: HttpClient) {
    this.baseurl = environment.baseurl
  }


  //  list of users
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseurl + this.user)
  }

  //  Create customer
  createCustomer(data: any): Observable<any> {
    return this.http.post(this.baseurl + this.user, data)
  }

  //  individual customer details
  getIndividualCustomer(id: any) {
    return this.http.get(this.baseurl + this.user + '/' + id)
  }

  // update customer details
  updateCustomer(id: any, data: any) {
    return this.http.put(this.baseurl + this.user + '/' + id, data)
  }

  //Delete customer
  deleteCustomer(id: any) {
    return this.http.delete(this.baseurl + this.user + '/' + id)
  }
}
