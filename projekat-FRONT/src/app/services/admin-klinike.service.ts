import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sala } from '../models/Sala.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Klinika } from '../models/klinika.model';
import { AdminKlinike } from '../models/adminKlinike.model';
import { Cena } from '../models/cena.model';
import { User } from '../models/user.model';
import { Pregled } from '../models/pacijent';

@Injectable({
  providedIn: 'root'
})
export class AdminKlinikeService {

  constructor(private http: HttpClient) { }

  public getAdminaIzBaze():Observable<AdminKlinike>{
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.get<AdminKlinike>('http://localhost:8088/getAdminaKlinike/', {headers: header});
  }
  public getSveSale(id:number):Observable<Sala[]>{
    return this.http.get<Sala[]>('http://localhost:8088/klinika/'+id+'/sale');
  }
  public getZahteviZakazivanjaByIdKlinike(id:number):Observable<Pregled[]>{
    console.log("Service: " + id);
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.get<Pregled[]>('http://localhost:8088/getZahteviZakazivanjaByIdKlinike/'+id,  {headers: header});
  }
  public getSveCene(id:number):Observable<Cena[]>{
    return this.http.get<Cena[]>('http://localhost:8088/klinika/'+id+'/cene');
  }
  public getKlinikaByAdminId(id:number):Observable<Klinika>{
    return this.http.get<Klinika>('http://localhost:8088/getKlinikaByAdminId/'+id);
  }
  public getAdmini():Observable<AdminKlinike[]>{
    return this.http.get<AdminKlinike[]>('http://localhost:8088/getAdmineKlinike');
  }
  public getAdmin(id:number):Observable<AdminKlinike>{
    return this.http.get<AdminKlinike>('http://localhost:8088/getAdminaKlinike/'+id);
  }
  public updateKliniku(klinika: Klinika): void {
    this.http.put('http://localhost:8088/klinika', klinika).subscribe();
  }

  public updateAdminaK(admin: AdminKlinike): void {
    this.http.put('http://localhost:8088/adminKlinike', admin).subscribe();
  }
  public updateUser(user: User): void {
    this.http.put('http://localhost:8088/useraAdminaKlinike', user).subscribe();
  }
  public getUserById(id:number):Observable<User>{
    return this.http.get<User>('http://localhost:8088/user/'+id);
  }

  public getCeneByIdKlinike(id:number):Observable<Cena[]>{
    return this.http.get<Cena[]>('http://localhost:8088/getCeneByIdKlinike/'+id);
  }
  public getAllSlobodniTerminiPregleda():Observable<Pregled[]>{
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.get<Pregled[]>('http://localhost:8088/pregledi/getAllSlobodniTerminiPregleda/',{headers: header});
  }
  public checkOldPassword(u: User):Observable<User>{
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post<User>('http://localhost:8088/checkOldPassword', u, {headers: header});
  }
}
