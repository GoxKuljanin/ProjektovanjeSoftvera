import { TipPregledaService } from './../../../services/tip-pregleda.service';
import { TipPregleda } from './../../../models/tipPregleda.model';
import { KlinikaService } from './../../../services/klinika.service';
import { LoginService } from './../../../services/login.service';
import { PregledService } from './../../../services/pregled.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { equal } from 'assert';
import { Klinika } from '../../../models/klinika.model';
import { Sala } from '../../../models/sala.model';
import { Termin } from '../../../models/termin.model';
import { Lekar } from '../../../models/lekar.model';
import { Cena } from '../../../models/cena.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pregled } from 'src/app/models/pacijent';
import { MatDatepickerInputEvent, MatCalendarCellCssClasses, MatSnackBar } from '@angular/material';

import * as moment from 'moment';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-prikaz-klinike',
  templateUrl: './prikaz-klinike.component.html',
  styleUrls: ['./prikaz-klinike.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PrikazKlinikeComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['trajanje', 'lekar', 'cena', 'sala', 'zakazi', 'ocena']
  displayedColumns2: string[] = ['naziv', 'adresa', 'klinika','prikazilekare']
  displayedColumns3: string[] = ['ime', 'specijalizacija','zakazi']

  slobodniLekari: Lekar[] = []
  slobodniLekariSource = new MatTableDataSource<Lekar>();
  slobodniLekari2: Lekar[] = [];
  slobodniLekariSource2 = new MatTableDataSource<Lekar>();

  selectedIndexForTab = new FormControl(0);
  dataSource
  preglediSource;
  pregledi: Pregled[];
  klinike: Klinika[] = [];
  klinika: Klinika;
  username: string;

  sviPregledi: Pregled[] = []; //za datume
  sviTipoviPregleda: TipPregleda[] = [];

  allpregledi: Pregled[] = []

  dateClass = (d: Date): MatCalendarCellCssClasses => {
    const day = d.getDay();
    const month = d.getMonth() + 1;
    const date = d.getDate();
    const year = d.getFullYear();
    let i = 0;

    for(let pregled of this.sviPregledi){
        const dan = parseInt(pregled.termin.datum.split('.')[0]);
        const mesec = parseInt(pregled.termin.datum.split('.')[1]);
        const godina = parseInt(pregled.termin.datum.split('.')[2]);
        if( date === dan && month === mesec && year === godina){
          return 'example-custom-date-class';
        }
    }
    return undefined;
    //if(date != 1){
      //return 'example-custom-date-class';
    //}
    //return undefined;
  }


  constructor(private route: ActivatedRoute, private pregledService: PregledService, private klinikaService: KlinikaService,
    private router: Router, private tipPregledaService: TipPregledaService, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.klinikaService.getKlinike().subscribe(
      data => {
        this.klinike = data;
        console.log(data);
        console.log(this.klinike);
        let idSelektovanog = parseInt(this.route.snapshot.paramMap.get('id'));
        this.klinika = this.klinike.find(x => x.id == idSelektovanog);
        if(this.klinika){
          this.pregledService.getAllPreglediKlinike(this.klinika.id).subscribe(
            data => {
              this.sviPregledi = data;
              this.tipPregledaService.getTipoviPregleda().subscribe(
                data => {
                  this.sviTipoviPregleda = data;
                  console.log(data);
                }
              );
            });
        }
      }

    );
  }


  zakaziPregled(id: any) {
    this.pregledService.zakaziPregledZaPacijenta(id, localStorage.getItem('logedInUser')).subscribe(
      data => {
        let i = 0;
        for (let zaBrisanje of this.pregledi) {
          if (id === zaBrisanje.id) {
            //this.preglediSource.splice(this.preglediSource.indexOf(this.pregledi[0]), 1);
            this.pregledi.splice(i, 1);
            this.snackBar.open('Uspesno ste zakazali pregled. Hvala Vam na poverenju!', 'U redu', { duration: 15000 });
            break;
          }
          i += 1;
        }
        this.preglediSource = new MatTableDataSource(this.pregledi);

      }
    );
  }

  selectedDate(event: MatDatepickerInputEvent<Date>) {
    let dat = moment(event.value).format('DD.MM.YYYY');
    console.log(dat);
    this.pregledService.getPreglediByDatum(dat, this.klinika.id).subscribe(
      (data) => {
        this.pregledi = data;
        this.preglediSource = new MatTableDataSource(data);
        this.selectedIndexForTab.setValue(1);
      },
      (error) => {
        this.snackBar.open('Ne postoji ni jedan slobodan pregled za taj datum!', 'U redu', { duration: 15000 });
      }
    );
  }

  //**************************************************************************************************** */
  //Za biranje datuma zahteva
  selectedOption: string;
  dat: string;
  selectedDate2(event: MatDatepickerInputEvent<Date>) {
    this.dat = moment(event.value).format('DD.MM.YYYY');
    if(this.selectedOption === "" || this.selectedOption === undefined){
      this.snackBar.open('Morate izabrati Tip Pregleda!', 'U redu', { duration: 15000 });
    }else{
      this.pregledService.getSlobodniLekari(this.dat, this.selectedOption).subscribe(
        data => {
          this.slobodniLekari = data;
          console.log(data);
          this.slobodniLekariSource = new MatTableDataSource(data);
          this.selectedIndexForTab.setValue(3);
        },
        err => {
          this.snackBar.open('Na zalost, nemamo dostupnih lekara za taj datum!', 'U redu', { duration: 15000 });
        }
      );
    }
  }

  prikaziLekare(id: number){
    for(let lekar of this.slobodniLekari){
      if(lekar.klinika.id === id ){
        if(!this.slobodniLekari2.find(((i: any) => i.id === id))){
          this.slobodniLekari2.push(lekar);
          this.selectedIndexForTab.setValue(4);
        }
          
      }
    }
    this.slobodniLekariSource2.data = this.slobodniLekari2;
  }

  //Zakazivanje kod nekog lekara
  posaljiZahtevZaPregled(id: any){
      this.pregledService.zakaziProizvoljanPregled(id, this.dat).subscribe(
        dat => {
          let lekar = this.slobodniLekari2.find(((i: any) => i.id === id));
          let novilekari: Lekar[] = [];
          for(let l of this.slobodniLekari2){
            if(l.id != lekar.id){
                novilekari.push(l);
            }
          }
          this.slobodniLekari2 = novilekari;
          this.slobodniLekariSource2.data = novilekari;
          this.snackBar.open('Hvala Vam sto koristite nase usluge. Molimo da sacekate mail o potvrdi Vaseg termina', 'U redu', { duration: 15000 });
        },
        error => {
          this.snackBar.open('Trenutno ne mozemo da zakazemo Vas zeljeni termin. Probajte ponovo!', 'U redu', { duration: 15000 });
        }
      );
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean){
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }