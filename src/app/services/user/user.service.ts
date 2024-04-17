import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environments.prod';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public baseurl:any;
public user:string ='users'
  constructor(public http:HttpClient) {
    this.baseurl = environment.baseurl
   }

  
   //  list of users
getUsers():Observable<any[]>{

  return this.http.get<any[]>(`https://jsonplaceholder.typicode.com/users`)
}

}
