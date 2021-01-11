import { MatSort } from '@angular/material/sort';
import { PacijentService } from 'src/app/services/pacijentServices/pacijent.service';
import { Lekar } from './../../../models/lekar.model';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { PregledService } from 'src/app/services/pregled.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-ocene-lekari-klinike',
  templateUrl: './ocene-lekari-klinike.component.html',
  styleUrls: ['./ocene-lekari-klinike.component.css']
})
export class OceneLekariKlinikeComponent implements OnInit {

  displayedColumns: string[] = ['lekar', 'ocena', 'klinika'];

  oceneLekara: OcenaLekar[] = [];
  sortedData = new MatTableDataSource<OcenaLekar>();
  search: string;

  constructor(private service: PacijentService, public snackBar: MatSnackBar) { 
    this.sortedData.data = this.oceneLekara.slice();
  }

  ngOnInit() {
    this.service.oceneLekara().subscribe(
      data => {
        this.oceneLekara = data;
        this.sortedData.data = data;
      }
    );
  }
  ratingComponentClick(clickObj: any): void{
    this.snackBar.open('Vec ste ocenili lekara', 'U redu', { duration: 15000 });
  } 

  sortData(sort: MatSort){
    const data = this.oceneLekara.slice();
    if( !sort.active || sort.direction === ''){
      this.sortedData.data = data;
      return;
    }
    this.sortedData.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch(sort.active){
        case 'lekar': return compare(a.lekar.user.firstname, b.lekar.user.firstname, isAsc);
        case 'ocena': return compare(a.ocena, b.ocena, isAsc);
        case 'klinika': return compare(a.lekar.klinika.naziv, b.lekar.klinika.naziv, isAsc);
        default: return 0;
      }
    });
  }
  Search(){
    if(this.search == ""){
      this.sortedData.data = this.oceneLekara
    }else {
      this.sortedData.data = this.oceneLekara.filter(
        res => {
          return res.ocena.toString().match(this.search.toLocaleLowerCase()) ||
          res.lekar.user.firstname.toLocaleLowerCase().match(this.search.toLocaleLowerCase()) ||
          res.lekar.klinika.naziv.toLocaleLowerCase().match(this.search.toLocaleLowerCase())
        }
      );
    }
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean){
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

export class OcenaLekar {
  id: number;
  ocena: number;
  lekar: Lekar;
}