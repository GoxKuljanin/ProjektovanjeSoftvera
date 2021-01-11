import { Component, OnInit, Inject } from '@angular/core';
import { TipPregleda } from 'src/app/models/tipPregleda.model';
import { Sala } from 'src/app/models/Sala.model';
import { Klinika } from 'src/app/models/klinika.model';
import { Lekar } from 'src/app/models/lekar.model';
import { Cena } from 'src/app/models/cena.model';
import { Termin } from 'src/app/models/termin.model';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdminKlinikeService } from 'src/app/services/admin-klinike.service';
import { Router } from '@angular/router';
import { LekarService } from 'src/app/services/lekar.service';
import { SaleService } from 'src/app/services/sale.service';
import { TipPregledaService } from 'src/app/services/tip-pregleda.service';
import { Pregled } from 'src/app/models/pacijent';
import { PregledService } from 'src/app/services/pregled.service';

@Component({
  selector: 'app-slobodni-termini-dialog',
  templateUrl: './slobodni-termini-dialog.component.html',
  styleUrls: ['./slobodni-termini-dialog.component.css']
})
export class SlobodniTerminiDialogComponent implements OnInit {
  tipovi: TipPregleda[];
  selectedTip: TipPregleda= new TipPregleda();
  sale: Sala[];
  selectedSala: Sala= new Sala();
  lekari: Lekar[];
  selectedLekar : Lekar= new Lekar();
  cene: Cena[];
  selectedCena:Cena = new Cena();
  termini: Termin[];
  selectedTermin: Termin;
  klinika: Klinika = new Klinika();
  pregled: Pregled = new Pregled();
  startDate: Date = new Date();
  datum: Date;
  termin: Termin = new Termin();
  timeFrom:Date = new Date();
  timeTo:Date = new Date();

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SlobodniTerminiDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public lekarService: LekarService, private pregledService: PregledService,
    public adminKlinikeService: AdminKlinikeService, private rout: Router, private salaService: SaleService, private tipPregledaService: TipPregledaService) {
      this.timeFrom.setHours(12,0,0,0);
      this.timeTo.setHours(12,0,0,0);
      this.startDate.setDate(this.startDate.getDate()+1);
      this.klinika=data.klinika;
      console.log(this.klinika);
      lekarService.getLekariByIdKlinike(this.klinika.id).subscribe(data=>{
        this.lekari =  data;
      })
      salaService.getSaleByIdKlinike(this.klinika.id).subscribe(data=>{
        this.sale=data;
      })
      adminKlinikeService.getCeneByIdKlinike(this.klinika.id).subscribe(data=>{
        this.cene=data;
      })
      tipPregledaService.getTipoviPregledaByIdKlinike(this.klinika.id).subscribe(data=>{
        this.tipovi=data;
      })
     }

  ngOnInit() {
  }
  cenaSelectionChanged(){

  }
  public addTermin(): void {
    let tstr = +this.timeFrom.toString().split(":")[0];
    let tstr1 = +this.timeFrom.toString().split(":")[1];
    let fstr = +this.timeTo.toString().split(":")[0];
    let fstr1 = +this.timeTo.toString().split(":")[1];
    let raz =(fstr*60+fstr1) -(tstr*60+tstr1) ;
    let sat = Math.floor(raz/60)
    let min = raz-(sat*60);
    let trajanje = sat.toString() + ":" + min.toString();
    
    this.pregled.cena = this.selectedCena.vrednost;
    this.pregled.lekar = this.selectedLekar;
    this.pregled.sala = this.selectedSala;
    this.pregled.trajanje = trajanje;
    this.pregled.klinika = this.klinika;
    this.pregled.tippregleda=this.selectedTip;
    let month = this.datum.getMonth()+1;
    let day = this.datum.getDate();
    let year = this.datum.getFullYear();
    let dateString = `${month}.${day}.${year}`;
    this.termin.datum = dateString;
    this.termin.vreme = this.timeFrom.toString();
    this.pregledService.addTermin(this.termin).subscribe(
      termin=>{
        this.pregled.termin = termin;
        console.log(termin);
        console.log(this.pregled);
        this.pregledService.addPregled(this.pregled).subscribe();
        this.snackBar.open('Uspesno ste dodali slobodan termin!', 'U redu', { duration: 1000 });
        
      }
    )
    this.dialogRef.close();
    window.location.href = this.rout.url;

  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste!', 'U redu', { duration: 1000 });
  }
}
