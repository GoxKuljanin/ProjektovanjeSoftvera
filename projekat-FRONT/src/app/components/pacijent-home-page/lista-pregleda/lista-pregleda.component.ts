import { PutanjaService } from './../../../putanje/putanje.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lekar } from 'src/app/models/lekar.model';
import { Pregled } from './../../../models/pacijent';
import { PacijentService } from './../../../services/pacijentServices/pacijent.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-lista-pregleda',
  templateUrl: './lista-pregleda.component.html',
  styleUrls: ['./lista-pregleda.component.css']
})
export class ListaPregledaComponent implements OnInit {

  displayedColumns: string[] = ['termin', 'firstname', 'lastname', 'specijalizacija', 'prosecnaocena', 'klinika'];

  search: string;
  sortedData = new MatTableDataSource<Pregled>();

  lekariOcenePregled: Pregled[] = [];
  imaKarton = false;

  constructor(private http: HttpClient, private putanja: PutanjaService, public snackBar: MatSnackBar) {
    this.sortedData.data = this.lekariOcenePregled.slice();
   }

  ngOnInit() {
    this.getPregledi().subscribe(
      data => {
        this.lekariOcenePregled = data;
        this.sortedData.data = data;
        console.log(this.lekariOcenePregled);
        this.imaKarton = true;
      }
    );    

  }
  getPregledi(): Observable<Pregled[]>{
    return this.http.get<Pregled[]>('http://localhost:8088/pregledi/istorijaPregleda');
  }

  ratingComponentClick(clickObj: any):void{
      const lekar = this.lekariOcenePregled.find(((i: any) => i.lekar.id === clickObj.lekarId));
      if( lekar) {
        this.postZahtev(lekar.id, clickObj.ocena, this.putanja.oceniPacijenta).subscribe(
          data => {
            this.snackBar.open('Hvala Vam sto doprinosite unapredjenju nase usluge ocenjivanjem naseg lekara!', 'U redu', { duration: 15000 });
          }
        );

      }

      
  


  }
  ratingComponentClickKlinike(clickObj: any): void{
    const klinika = this.lekariOcenePregled.find(((i: any) => i.lekar.klinika.id === clickObj.klinikaId));
    if(klinika){
      this.postZahtev(klinika.id, clickObj.ocenaKlinika, this.putanja.oceniKliniku).subscribe(
        data => {
          this.snackBar.open('Hvala Vam sto doprinosite unapredjenju nase usluge ocenjivanjem nase klinike!', 'U redu', { duration: 15000 });
        }
      );
    }
  }

  postZahtev(id: number, novaOcena: number, putanja: string){
     let header = new HttpHeaders();
     header.append('Content-Type', 'application/json');
      return this.http.post(putanja + id, novaOcena, {headers: header} );
  }

  sortData(sort: MatSort){
    const data = this.lekariOcenePregled.slice();
    if( !sort.active || sort.direction === ''){
      this.sortedData.data = data;
      return;
    }
    this.sortedData.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch(sort.active){
        //case 'Datum': return compare(a.datum, b.datum, isAsc);
        case 'firstname': return compare(a.lekar.user.firstname, b.lekar.user.firstname, isAsc);
        case 'lastname': return compare(a.lekar.user.lastname, b.lekar.user.firstname, isAsc);
        case 'specijalizacija': return compare(a.lekar.specijalizacija, b.lekar.specijalizacija, isAsc);
        case 'prosecnaocena': return compare(a.lekar.prosecnaocena, b.lekar.prosecnaocena, isAsc);
        default: return 0;
      }
    });
    }


    Search(){
      if(this.search == ""){
        this.sortedData.data = this.lekariOcenePregled;
      }else{
          this.sortedData.data = this.lekariOcenePregled.filter(
            res => {
              return res.lekar.user.firstname.toLocaleLowerCase().match(this.search.toLocaleLowerCase()) ||
                res.lekar.user.lastname.toLocaleLowerCase().match(this.search.toLocaleLowerCase()) ||
                res.lekar.specijalizacija.toLocaleLowerCase().match(this.search.toLocaleLowerCase()) ||
                res.lekar.prosecnaocena.toString().match(this.search.toLocaleLowerCase());
            }
          );
      }
    }
  
}

function compare(a: number | string, b: number | string, isAsc: boolean){
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
