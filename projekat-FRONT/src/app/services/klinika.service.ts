import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Klinika } from 'src/app/models/klinika.model';
import { Observable } from 'rxjs';
import { Cena } from '../models/cena.model';

@Injectable({
  providedIn: 'root'
})
export class KlinikaService {

  constructor(private http: HttpClient) { }

  public getKlinike():Observable<Klinika[]>{
    return this.http.get<Klinika[]>('http://localhost:8088/klinike');
  }

  public getCeneKlinike(id:number):Observable<Cena[]>{
    return this.http.get<Cena[]>('http://localhost:8088/getCeneByIdKlinike'+id);
  }
}
