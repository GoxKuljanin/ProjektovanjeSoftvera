import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { TipPregleda } from 'src/app/models/tipPregleda.model';
import { TipPregledaService } from 'src/app/services/tip-pregleda.service';
import { AdminKlinikeService } from 'src/app/services/admin-klinike.service';
import { Klinika } from 'src/app/models/klinika.model';

@Component({
  selector: 'app-tipovi-pregleda-dialog',
  templateUrl: './tipovi-pregleda-dialog.component.html',
  styleUrls: ['./tipovi-pregleda-dialog.component.css']
})
export class TipoviPregledaDialogComponent implements OnInit {
  private tipPregleda: TipPregleda = new TipPregleda();
  private naziv:string;
  private opis:string;
  klinika: Klinika = new Klinika();
  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<TipoviPregledaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private rout: Router,private service: TipPregledaService,private adminKlinikeService: AdminKlinikeService) {
      this.dobaviUlogovanogLekara();
      console.log(data);
      if(data.flag==1 || data.flag==2) {
        this.tipPregleda=data.tipPregleda;
        this.opis = data.tipPregleda.opis;
        this.naziv = data.tipPregleda.naziv;
      }
     }

  ngOnInit() {
  }
  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste!', 'U redu', { duration: 2000 });
  }

  public dobaviUlogovanogLekara() {
    this.adminKlinikeService.getAdminaIzBaze().subscribe(
      data => {
        this.klinika=data.klinika;
      }
    );
  }

  private addTipPregleda() {
    //if(this.naziv=='' || this.opis=='') {
    this.tipPregleda.naziv = this.naziv;
    this.tipPregleda.opis= this.opis;
    this.tipPregleda.klinika = this.klinika;
    let res = this.service.addTipPregleda(this.tipPregleda);
    res.subscribe((res) => {
      if (res == null) {
        this.snackBar.open('Greska pri dodavanju tipa pregleda!', 'U redu', { duration: 2000 });
      } else {

        this.snackBar.open('Uspesno dodat tip pregleda!', 'U redu', { duration: 2000 });
      }
    });
    this.dialogRef.close();
    window.location.href = this.rout.url;
  //} else 
   // this.snackBar.open('Popunite sva polja', 'U redu', { duration: 5000 });
  }
  private updateTipPregleda() {
    //if(this.naziv.length()==0 || this.opis=='') {
    console.log(this.naziv);
    this.tipPregleda.naziv = this.naziv;
    this.tipPregleda.opis= this.opis;
    let res = this.service.updateTipPregleda(this.tipPregleda);
    res.subscribe((res) => {
      if (res == null) {
        this.snackBar.open('Greska pri izmeni tipa pegleda!', 'U redu', { duration: 2000 });
      } else {

        this.snackBar.open('Uspesno ste izmenili tip pregleda!', 'U redu', { duration: 2000 });
      }
    });
    this.dialogRef.close();
    window.location.href = this.rout.url;
  //} else 
  //this.snackBar.open('Popunite sva polja', 'U redu', { duration: 5000 });
  }

  private deleteTipPregleda() {
    let res = this.service.deleteTipPregleda(this.tipPregleda.id);
    res.subscribe((res) => {
        this.snackBar.open('Uspesno ste obrisali tip pregleda!', 'U redu', { duration: 1000 });
    });
    this.dialogRef.close();
    window.location.href = this.rout.url;
  }
}
