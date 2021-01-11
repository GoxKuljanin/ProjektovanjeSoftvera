import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ZahtevZaZakazivanje } from 'src/app/models/zahtevZakazivanjaPregleda.model';
import { ZahteviZakazivanjaService } from 'src/app/services/zahtevi-zakazivanja.service';
import { Lekar } from 'src/app/models/lekar.model';
import { Pacijent, Pregled } from 'src/app/models/pacijent';
import { Cena } from 'src/app/models/cena.model';
import { TipPregleda } from 'src/app/models/tipPregleda.model';
import { LekarService } from 'src/app/services/lekar.service';
import { Router } from '@angular/router';
import { Klinika } from 'src/app/models/klinika.model';
import { AdminKlinikeService } from 'src/app/services/admin-klinike.service';
import { TipPregledaService } from 'src/app/services/tip-pregleda.service';
import { Termin } from 'src/app/models/termin.model';
import { PregledService } from 'src/app/services/pregled.service';
import { Sala } from 'src/app/models/Sala.model';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-zakazi-pregled-dialog',
  templateUrl: './zakazi-pregled-dialog.component.html',
  styleUrls: ['./zakazi-pregled-dialog.component.css']
})
export class ZakaziPregledDialogComponent implements OnInit {
  startDate: Date = new Date();
  datum: Date;
  vreme: string;
  lekar: Lekar = new Lekar();
  pacijent: Pacijent = new Pacijent();
  cene: Cena[] ;
  selectedCena: Cena = new Cena();
  klinika: Klinika = new Klinika();
  tipovi: TipPregleda[];
  selectedTip: TipPregleda = new TipPregleda();
  timeFrom: Date = new Date();
  timeTo: Date = new Date();
  pregled:Pregled = new Pregled();
  termin: Termin = new Termin();
  sale: Sala[];
  selectedSala: Sala= new Sala();

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ZakaziPregledDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private zakaziPregled: ZahteviZakazivanjaService,private pregledService: PregledService,
    public service: LekarService, private rout: Router, public adminKlinikeService: AdminKlinikeService, private tipPregledaService: TipPregledaService, private salaService: SaleService) {
      this.startDate.setDate(this.startDate.getDate()+1);
    this.lekar = data.lekar;
    this.pacijent = data.pacijent;
    this.klinika = data.lekar.klinika;
    adminKlinikeService.getCeneByIdKlinike(this.klinika.id).subscribe(data => {
      this.cene = data;
    })
    tipPregledaService.getTipoviPregledaByIdKlinike(this.klinika.id).subscribe(data => {
      this.tipovi = data;
    })
    salaService.getSaleByIdKlinike(this.klinika.id).subscribe(data=>{
      this.sale=data;
    })
  }

  ngOnInit() {

  }

  public submit(): void {
    console.log("Submit:");
    let tstr = +this.timeFrom.toString().split(":")[0];
    let tstr1 = +this.timeFrom.toString().split(":")[1];
    let fstr = +this.timeTo.toString().split(":")[0];
    let fstr1 = +this.timeTo.toString().split(":")[1];
    let raz = (fstr * 60 + fstr1) - (tstr * 60 + tstr1);
    let sat = Math.floor(raz / 60)
    let min = raz - (sat * 60);
    let trajanje = sat.toString() + ":" + min.toString();
    this.pregled.lekar = this.lekar;
    this.pregled.pacijent = this.pacijent;
    this.pregled.tippregleda = this.selectedTip;
    this.pregled.cena = this.selectedCena.vrednost;
    let month = this.datum.getMonth() + 1;
    let day = this.datum.getDate();
    let year = this.datum.getFullYear();
    let dateString = `${month}.${day}.${year}`;
    console.log(dateString);
    this.termin.datum= dateString;
    this.termin.vreme = this.timeFrom.toString();
    this.pregled.trajanje = trajanje;
    this.pregled.sala=this.selectedSala;
    console.log(this.pregled);
    this.pregledService.addTermin(this.termin).subscribe(
      termin=>{
        this.pregled.termin = termin;
        console.log(termin);
        console.log(this.pregled);
        this.pregledService.addPregledLekar(this.pregled).subscribe();
        this.snackBar.open('Zahtev je poslat administratoru!', 'U redu', { duration: 5000 });
        
      });
      this.dialogRef.close();
  }
  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste!', 'U redu', { duration: 1000 });
  }

}
