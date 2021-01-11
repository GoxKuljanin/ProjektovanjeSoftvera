import { Component, OnInit } from '@angular/core';
import { Pacijent , PregledanPacijent} from 'src/app/models/pacijent';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table'; 
import { PacijentService } from 'src/app/services/pacijentServices/pacijent.service';
import { Subscription } from 'rxjs';
import { sortAscendingPriority } from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router';
import { LekarService } from 'src/app/services/lekar.service';
@Component({
  selector: 'app-pacijenti',
  templateUrl: './pacijenti.component.html',
  styleUrls: ['./pacijenti.component.css']
})
export class PacijentiComponent implements OnInit {
  search: string
  pacijenti: Pacijent[] = []
  srtByName: MatSort
  selectedGrad: string
  selectedStatus: string
  pacijentiRES: Pacijent[]
  tableSource
  sortedData: Pacijent[]
  searchData: Pacijent[]
  pregledaniPacijenti: Pacijent[];
  idLekar:number;
  gradFlag: number = 0
  pacijentFlag: number = 0
  states: string[] = [
    'Svi', 'Ruma', 'Novi Sad', 'Sremska Mitrovica'
  ];
  statusPacijenta: string[] = [
    'Svi', 'Pregledani'
  ];
  displayedColumns: string[] = ['Ime', 'Prezime', 'JedinstveniBroj', 'Email', 'Kontakt', 'Adresa', 'Grad', 'Drzava', 'ZdravstveniKarton', ' ']


  constructor(private pacijentService: PacijentService, private route: ActivatedRoute,private service: LekarService) {
    this.dobaviUlogovanogLekara();
    this.pacijentService.getPacijente().subscribe(
      data => {
        this.pacijenti = data;
        this.tableSource = new MatTableDataSource(this.pacijenti.slice())
        this.pacijentiRES = this.pacijenti.slice()
        this.searchData = this.pacijenti.slice()
        //Prikupljanje svih pregledanih pacijenaa od strane ulogovanog
        this.service.getPregledaniPacijentiByLekarId(this.idLekar).subscribe(
          data => {
            this.pregledaniPacijenti = data;
            console.log(this.pregledaniPacijenti);
          }
        );
      }
    );
   }

  ngOnInit() {
  }

  public dobaviUlogovanogLekara() {
    this.service.getLekaraIzBaze().subscribe(
      data => {
        if (data != null) {
          this.idLekar = data.id;
        } else {
          alert('Niste uneli odgovarajuce parametre!');
        }
      }
    );
  }

  //Funkcije-------------------------------------
  Search() {
    if (this.search == "") {
      this.sortedData = this.searchData;
      this.tableSource = new MatTableDataSource(this.sortedData);
    } else {
      this.pacijentiRES = this.searchData.filter(res => {
        return ( res.user.username.toLocaleLowerCase() + ' ' + res.user.lastname.toLocaleLowerCase()).match(this.search.toLocaleLowerCase()) ||
          res.id.toString().toLocaleLowerCase().match(this.search.toLocaleLowerCase())
      });
      this.sortedData = this.pacijentiRES;
      this.tableSource = new MatTableDataSource(this.sortedData);
    }
  }

  FilterGrad() {
    if (this.selectedGrad == "Svi") {
      this.pacijentiRES = this.pacijenti.slice()
      this.sortedData = this.pacijentiRES;
      this.searchData = this.pacijentiRES;
      this.tableSource = new MatTableDataSource(this.sortedData);
      this.selectedStatus = ""
      this.search = ""
    } else {
      this.pacijentiRES = this.pacijenti.filter(res => { return res.user.city.toLocaleLowerCase().match(this.selectedGrad.toLocaleLowerCase()) });
      this.sortedData = this.pacijentiRES;
      this.tableSource = new MatTableDataSource(this.sortedData);
      this.searchData = this.pacijentiRES;
      this.search = ""
      this.selectedStatus = ""
    }
  }
  FilterPacijent() {
    if (this.selectedStatus == "Svi") {
      this.pacijentiRES = this.pacijenti.slice()
      this.sortedData = this.pacijentiRES;
      this.searchData = this.pacijentiRES;
      this.tableSource = new MatTableDataSource(this.sortedData);
      this.search = ""
      this.selectedGrad = ""
    } else {
      this.pacijentiRES = this.pacijenti.slice()
      this.sortedData=this.pregledaniPacijenti;
      this.selectedGrad = ""
      this.tableSource = new MatTableDataSource(this.sortedData);
      this.searchData = this.sortedData;
      this.search = ""
    }
  }

  sortData(sort: MatSort) {

    const data = this.pacijentiRES.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      this.tableSource = new MatTableDataSource(this.sortedData);
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Ime': return compare(a.user.firstname, b.user.firstname, isAsc);
        case 'Prezime': return compare(a.user.lastname, b.user.lastname, isAsc);
        case 'Email': return compare(a.user.username, b.user.username, isAsc);
        case 'Kontakt': return compare(a.user.phoneNumber, b.user.phoneNumber, isAsc);
        case 'Adresa': return compare(a.user.adress, b.user.adress, isAsc);
        case 'Grad': return compare(a.user.city, b.user.city, isAsc);
        case 'Drzava': return compare(a.user.country, b.user.country, isAsc);
        case 'ZdravstveniKarton': return compare(a.zdravstveniKarton.id, b.zdravstveniKarton.id, isAsc);
        default: return 0;
      }
    });
    this.tableSource = new MatTableDataSource(this.sortedData);
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

