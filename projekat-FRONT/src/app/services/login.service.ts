import { AuthService } from './authService/auth.service';
import { PutanjaService } from './../putanje/putanje.service';
import { User } from './../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //user: User;   //Korisceno kod logovanja kao pacijent, da se zapamti koji korisnik je logovan
                    //Stanje podeseno u login.component.ts

  loggedInUser;

  constructor(private http: HttpClient, private putanjaService: PutanjaService) { }

  getUserData(){
    return this.get(this.putanjaService.userInfo)
    .pipe(map(user =>{
        this.loggedInUser = user;
        this.saveAuthoritiesInStorage(user.authorities);
        return user;
    }))
  }

  saveAuthoritiesInStorage(authorities: string[]){
    window.sessionStorage.setItem('Authorities', JSON.stringify(authorities));
  }
  getTokenAuthorities(){
    return window.sessionStorage.getItem('Authorities');
  }

  get(path: string, args?: any): Observable<any> {
    let headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    
      const options = {
        headers: headers,
      };
  
  
      return this.http.get(path, options)
        .pipe(catchError(this.checkError.bind(this)));
    }

    private checkError(error: any): any {
      if (error && error.status === 401) {
        // this.redirectIfUnauth(error);
      } else {
        // this.displayError(error);
      }
      throw error;
    }
}
