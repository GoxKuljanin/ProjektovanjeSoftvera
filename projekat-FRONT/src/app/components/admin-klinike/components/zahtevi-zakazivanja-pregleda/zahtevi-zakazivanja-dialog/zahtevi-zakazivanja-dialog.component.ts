import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdminKlinikeService } from 'src/app/services/admin-klinike.service';
import { Router } from '@angular/router';
import { Pregled, Pacijent } from 'src/app/models/pacijent';
import { Sala } from 'src/app/models/Sala.model';
import { SaleService } from 'src/app/services/sale.service';
import { PregledService } from 'src/app/services/pregled.service';
import { Klinika } from 'src/app/models/klinika.model';

@Component({
  selector: 'app-zahtevi-zakazivanja-dialog',
  templateUrl: './zahtevi-zakazivanja-dialog.component.html',
  styleUrls: ['./zahtevi-zakazivanja-dialog.component.css']
})
export class ZahteviZakazivanjaDialogComponent implements OnInit {
  klinika:string;
  lekar:string;
  pacijent:string;
  datumvreme:string;
  tip:string;
  cena:string;
  idKlinike: number;
  pregled: Pregled = new Pregled();
  sale: Sala[];
  selectedSala:Sala=new Sala();
  p:Pacijent = new Pacijent();
  k:Klinika = new Klinika();
  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ZahteviZakazivanjaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private rout: Router, public adminKlinikeService: AdminKlinikeService, private salaService: SaleService, private pregledService: PregledService) {
     this.idKlinike = data.zahtev.lekar.klinika.id;
     this.klinika = data.zahtev.lekar.klinika.naziv;
     this.lekar = data.zahtev.lekar.user.firstname + " " + data.zahtev.lekar.user.lastname;
     this.pacijent = data.zahtev.pacijent.user.firstname + " " + data.zahtev.pacijent.user.lastname;
     this.tip = data.zahtev.tippregleda.naziv;
     this.cena = data.zahtev.cena;
     salaService.getSaleByIdKlinike(this.idKlinike).subscribe(sale=>{
       this.sale=sale;
     })
     this.p=data.zahtev.pacijent;
     this.k=data.zahtev.klinika;
     console.log(data)
     }

  ngOnInit() {
  }
  private submit(){
    this.pregled = this.data.zahtev;
    this.pregled.klinika = this.k;
    this.pregled.pacijent = this.p;
    this.pregled.sala = this.selectedSala;
    this.pregledService.updateZahtevZakazivanja(this.pregled).subscribe(data=>{
      this.snackBar.open('Uspešno modifikovan profil: ', 'U redu', { duration: 2500 });
      this.dialogRef.close();
      console.log(this.pregled);
    });
    window.location.href = this.rout.url;
  }
  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste!', 'U redu', { duration: 1000 });
  }
}
