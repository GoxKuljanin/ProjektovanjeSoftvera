import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ZahtevZaZakazivanje } from '../models/zahtevZakazivanjaPregleda.model';
import { Lekar } from '../models/lekar.model';
import { Pacijent } from '../models/pacijent';

@Injectable({
  providedIn: 'root'
})
export class ZahteviZakazivanjaService {

  constructor(private http: HttpClient) { }
  public getAll():Observable<ZahtevZaZakazivanje[]>{
    return this.http.get<ZahtevZaZakazivanje[]>('http://localhost:8088/ZahteviZaZakazivanje');
  }

  public create(zahtev: ZahtevZaZakazivanje){
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    this.http.post('http://localhost:8088/ZahteviZaZakazivanje', zahtev,{headers: header}).subscribe();
  }

  public getLekar(id:number):Observable<Lekar>{
    return this.http.get<Lekar>('http://localhost:8088/lekar/'+id);
  }

  public getPacijenta(id:number):Observable<Pacijent>{
    return this.http.get<Pacijent>('http://localhost:8088/getPacijenti/'+id);
  }
}
