import { Pacijent } from './../../models/pacijent';
import { Observable } from 'rxjs';
import { User } from './../../models/user.model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminKlinickogCentraService {

  constructor(private http: HttpClient) { }

  public getListaRegistrovanih(): Observable<User[]>{
    // return this.http.get<User[]>('http://localhost:8088/getAllUsers').subscribe(
    //   data => {
    //     console.log(data)
    //   }
    // )
    return this.http.get<User[]>('http://localhost:8088/getAllUsers');
  }

  public dodajPacijentaUBazu(model: User){
    return this.http.post('http://localhost:8088/dodajPacijentaUBazuPacijenata', model);
  }

  public dobaviSvePacijenteIzBaze():Observable<Pacijent[]>{
    return this.http.get<Pacijent[]>('http://localhost:8088/dobaviSvePacijenteIzBaze');
  }
  public aktivirajNalog(id: number){
    return this.http.post('http://localhost:8088/auth/aktivirajNalog', id);
  }

  public odbijZahtev(username: string, poruka: string){
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    let params = new HttpParams().set("username", username).set("poruka", poruka);
    return this.http.delete('http://localhost:8088/odbijZahtev',{headers: header, params: params});
  }
}
