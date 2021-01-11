import { PutanjaService } from './../../putanje/putanje.service';
import { User } from './../../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pacijent,Pregled,ZdravstveniKarton } from 'src/app/models/pacijent';
import { OcenaLekar } from 'src/app/components/pacijent-home-page/ocene-lekari-klinike/ocene-lekari-klinike.component';

@Injectable({
  providedIn: 'root'
})
export class PacijentService {

  constructor(private http: HttpClient, private putanjaService: PutanjaService) { }

public getPacijentaIzBaze(username:string):Observable<Pacijent>{
  let header = new HttpHeaders();
  header.append('Content-Type', 'application/json');
  return this.http.get<Pacijent>(this.putanjaService.pacijentInfo, {headers: header});
}

public updatePacijenta(pacijent: Pacijent): void {
  this.http.put(this.putanjaService.pacijentURL, pacijent).subscribe();
}

public azurirajPacijenta(user: User):Observable<User> {
  let header = new HttpHeaders();
  header.append('Content-Type', 'application/json');
  return this.http.post<User>('http://localhost:8088/pacijent/updatePacijent', user, {headers: header});

}
public azurirajSifraPacijenta(user: User):Observable<User> {
  let header = new HttpHeaders();
  header.append('Content-Type', 'application/json');
  return this.http.post<User>(this.putanjaService.azurirajSifraPacijent, user, {headers: header});
}

public getPacijente():Observable<Pacijent[]>{
  return this.http.get<Pacijent[]>('http://localhost:8088/pacijent/getPacijenti');
}
public getPacijenta(id:number):Observable<Pacijent>{
  return this.http.get<Pacijent>('http://localhost:8088/pacijent/getPacijenti/'+id);
}

public getZdravstveniKarton(username: string):Observable<ZdravstveniKarton>{
  let header = new HttpHeaders();
  header.append('Content-Type', 'application/json');
  return this.http.get<ZdravstveniKarton>(this.putanjaService.zdravstveniKarton,{headers: header});
}

//Izgleda da se ne koristi nigde
public getPreglede():Observable<Pregled[]>{
  return this.http.get<Pregled[]>('http://localhost:8088/getAllPregledi');
}
  
public oceneLekara(): Observable<OcenaLekar[]>{
  return this.http.get<OcenaLekar[]>('http://localhost:8088/pacijent/mojeOceneLekari');
}
}
