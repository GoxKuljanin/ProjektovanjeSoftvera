import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sala } from '../models/Sala.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient) { }
  public getSale():Observable<Sala[]>{
    return this.http.get<Sala[]>('http://localhost:8088/sale');
  }

  public addSala(sala: Sala){
    return this.http.post('http://localhost:8088/sala/', sala)
  }

  public updateSala(sala: Sala){
    return this.http.put('http://localhost:8088/sala/', sala)
  }

  public deleteSala(idSala: number){
    return this.http.delete('http://localhost:8088/sala/'+ idSala);
  }

  public getSaleByIdKlinike(id:number):Observable<Sala[]>{
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.get<Sala[]>('http://localhost:8088/getSaleByIdKlinike/'+id, {headers: header});
  }
}
