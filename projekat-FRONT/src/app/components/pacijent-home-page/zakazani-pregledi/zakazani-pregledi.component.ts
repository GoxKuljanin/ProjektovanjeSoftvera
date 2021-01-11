import { Pregled } from 'src/app/models/pacijent';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { PregledService } from './../../../services/pregled.service';
import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'app-zakazani-pregledi',
  templateUrl: './zakazani-pregledi.component.html',
  styleUrls: ['./zakazani-pregledi.component.css']
})
export class ZakazaniPreglediComponent implements OnInit {

  displayedColumns: string[] = ['datum', 'trajanje', 'lekar', 'cena', 'sala', 'odjavi']

  zakazaniPregledi: Pregled[] = [];
  //sortedData: Pregled[];
  preglediRES: Pregled[];
  search: string;
  sortedData = new MatTableDataSource<Pregled>();

  dat = new Date();
  today1 = moment(this.dat).format('DD.MM.YYYY');
  today = new Date(this.today1);

  constructor(private http: PregledService) { 
    this.sortedData.data = this.zakazaniPregledi.slice();
  }

  ngOnInit() {
    this.http.zakazaniPregledi(localStorage.getItem('logedInUser')).subscribe(
      data=>{
          this.zakazaniPregledi = data;
          this.preglediRES = this.zakazaniPregledi;
          this.sortedData.data = data;
          //let datum = new Date(this.zakazaniPregledi[0].termin.datum);
          
          
      }
    );
  }
  
  provjeri(datum: string){

    let dan = datum.split('.')[0];
    let mesec = datum.split('.')[1];
    let godina = datum.split('.')[2];
    datum = mesec + '.' + dan + '.' + godina;

    let zakazani = new Date(datum);

    let zakazaniDatum = moment(zakazani).format('DD.MM.YYYY');
    let zakazaniDan = parseInt(zakazaniDatum.split('.')[0]);
  
    let danasnjiDan = parseInt(this.today1.split('.')[0]);
    if((zakazaniDan) - (this.dat.getDate()) == 1){
      return true;
    }
    return false;
  }

  odjaviPregled(id: number){
    this.http.odjaviPregled(id);
    for(let zaBrisanje of this.sortedData.data){
      if(zaBrisanje.id === id){
        this.sortedData.data.splice(this.sortedData.data.indexOf(zaBrisanje), 1);
        this.sortedData._updateChangeSubscription();
        break;
      }
    }
  }

  sortData(sort: MatSort){
    const data = this.zakazaniPregledi.slice()
  if( !sort.active || sort.direction === ''){
    this.sortedData.data = data;
    return;
  }

  this.sortedData.data = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch(sort.active){
      case 'datum': return compare(a.termin.datum, b.termin.datum, isAsc);
      case 'trajanje': return compare(a.trajanje, b.trajanje, isAsc);
      case 'lekar': return compare(a.lekar.user.firstname, b.lekar.user.firstname, isAsc);
      case 'cena': return compare(a.cena, b.cena, isAsc);
      case 'sala': return compare(a.sala.name, b.sala.name, isAsc);
      default: return 0;
    }
  });
  }

  Search(){
    if(this.search == ""){
      this.sortedData.data = this.zakazaniPregledi;
    }else{
      this.preglediRES = this.zakazaniPregledi.filter( res=>{ return res.trajanje.toLocaleLowerCase().match(this.search.toLocaleLowerCase()) || 
        res.lekar.user.firstname.toLocaleLowerCase().match(this.search.toLocaleLowerCase()) || 
      res.sala.name.toLocaleLowerCase().match(this.search.toLocaleLowerCase()) || res.cena.toString().match(this.search.toLocaleLowerCase()) ||
        res.termin.datum.toLocaleLowerCase().match(this.search.toLocaleLowerCase()) } );
       this.sortedData.data = this.preglediRES;
    }
  }

}
function compare(a: number | string, b: number | string, isAsc: boolean){
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
