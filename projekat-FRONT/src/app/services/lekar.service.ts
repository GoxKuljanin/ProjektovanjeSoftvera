import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Lekar } from '../models/lekar.model';
import { User } from '../models/user.model';
import { Pacijent } from '../models/pacijent';

@Injectable({
  providedIn: 'root'
})
export class LekarService {

  constructor(private http: HttpClient) { }

  public getLekaraIzBaze():Observable<Lekar>{
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.get<Lekar>('http://localhost:8088/getLekarData/', {headers: header});
  }

  public getLekari():Observable<Lekar[]>{
    return this.http.get<Lekar[]>('http://localhost:8088/lekari');
  }

  public getPacijenti():Observable<Pacijent[]>{
    return this.http.get<Pacijent[]>('http://localhost:8088/getPacijentiLekara');
  }

  public getLekar(id:number):Observable<Lekar>{
    return this.http.get<Lekar>('http://localhost:8088/lekar/'+id);
  }

  public getPregledaniPacijentiByLekarId(id:number):Observable<Pacijent[]>{
    return this.http.get<Pacijent[]>('http://localhost:8088/lekar/'+id+'/pregledaniPacijenti');
  }
  public addLekar(lekar:Lekar){
    return this.http.post('http://localhost:8088/lekar', lekar);
  }

  public addUser(user: Lekar){
    return this.http.post('http://localhost:8088/userLekar/', user)
  }

  public deleteLekarAndUser(idLekar: number){
    return this.http.delete('http://localhost:8088/lekar/'+ idLekar);
  }

  public updatelekar(lekar: Lekar): void {
    this.http.put('http://localhost:8088/lekar', lekar).subscribe();
  }
  
  public updateUser(user: User): void {
    this.http.put('http://localhost:8088/updateUseraLekara', user).subscribe();
  }

  public getLekariByIdKlinike(id:number):Observable<Lekar[]>{
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.get<Lekar[]>('http://localhost:8088/getLekariByIdKlinike/'+id, {headers: header});
  }
}
