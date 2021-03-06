import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Identifiers } from '@angular/compiler';
import { Korisnik } from '../models/korisnik.model';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {
  private readonly API_URL = 'http://localhost:8088/korisnik/';

  dataChange: BehaviorSubject<Korisnik[]> = new BehaviorSubject<Korisnik[]>([]);
  constructor(private httpClient: HttpClient) { }

  public getAllKorisnik(): Observable<Korisnik[]> {
    this.httpClient.get<Korisnik[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    return this.dataChange.asObservable();
  }
  public addKorisnik(korisnik: Korisnik): void {
    this.httpClient.post(this.API_URL, korisnik).subscribe();
}

  public updateKorisnik(korisnik: Korisnik): void {
    this.httpClient.put(this.API_URL, korisnik).subscribe();
  }

  public deleteKorisnik(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe();
  }
}
