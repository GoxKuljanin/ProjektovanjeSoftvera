import { HttpClient } from '@angular/common/http';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  constructor(private http: HttpClient) { }

  public saveUser(user: User){
    return this.http.post('http://localhost:8088/auth/register', user)
  }
}
