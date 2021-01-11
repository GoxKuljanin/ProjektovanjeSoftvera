import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import {Klinika} from '../../models/klinika.model';
import { KlinikaService } from '../../services/klinika.service';

@Component({
  selector: 'app-lista-klinika',
  templateUrl: './lista-klinika.component.html',
  styleUrls: ['./lista-klinika.component.css']
})
export class ListaKlinikaComponent implements OnInit {
  klinike: Klinika[] = [];
  collumns: string[] = ['Ime', 'Adresa', 'Ocena'];
  search: string;
  clinicsRES: Klinika[];
  sortedData = new MatTableDataSource<Klinika>();

constructor(private service: KlinikaService) {
  this.sortedData.data = this.klinike.slice();
 }

ngOnInit() {
  this.service.getKlinike().subscribe(
    data => {
      this.klinike = data;
      this.clinicsRES = this.klinike;
      this.sortedData.data = data 
    }
  );
  
}

sortData(sort: MatSort){
  const data = this.klinike.slice()
  if( !sort.active || sort.direction === ''){
    this.sortedData.data = data;
    return;
  }

  this.sortedData.data = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch(sort.active){
      case 'Ime': return compare(a.naziv, b.naziv, isAsc);
      case 'Adresa': return compare(a.adresa, b.adresa, isAsc);
      case 'Ocena': return compare(a.ocenaklinike, b.ocenaklinike, isAsc);
      default: return 0;
    }
  });

}
Search(){
  if(this.search == ""){
    this.sortedData.data = this.klinike;
  }else{
    this.clinicsRES = this.klinike.filter( res=>{ return res.naziv.toLocaleLowerCase().match(this.search.toLocaleLowerCase()) ||
     res.adresa.toLocaleLowerCase().match(this.search.toLocaleLowerCase()) || 
     res.ocenaklinike.toString().match(this.search.toLocaleLowerCase()) } );
     this.sortedData.data = this.clinicsRES;
  }
}

}

function compare(a: number | string, b: number | string, isAsc: boolean){
return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
