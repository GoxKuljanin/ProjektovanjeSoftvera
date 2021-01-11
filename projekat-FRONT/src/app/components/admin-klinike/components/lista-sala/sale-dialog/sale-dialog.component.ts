import { Component, OnInit, Inject } from '@angular/core';
import { Sala } from 'src/app/models/Sala.model';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Klinika } from 'src/app/models/klinika.model';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-sale-dialog',
  templateUrl: './sale-dialog.component.html',
  styleUrls: ['./sale-dialog.component.css']
})
export class SaleDialogComponent implements OnInit {
  private sala: Sala = new Sala();
  naziv: string;
  broj: string;
  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SaleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private rout: Router, private salaService: SaleService) {
    if (data.flag == 1 || data.flag == 2) {
      this.sala = data.sala;
      this.broj = data.sala.brojsale;
      this.naziv = data.sala.name;
    }
  }

  ngOnInit() {
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste!', 'U redu', { duration: 2000 });
  }

  public addSala() {
    this.sala.klinika = this.data.klinika;
    this.sala.name = this.naziv;
    this.sala.brojsale = this.broj;
    let res = this.salaService.addSala(this.sala);
    res.subscribe((res) => {
      if (res == null) {
        this.snackBar.open('Greska pri dodavanju sale!', 'U redu', { duration: 2000 });
      } else {

        this.snackBar.open('Uspesno dodata sala!', 'U redu', { duration: 2000 });
      }
    });
    this.dialogRef.close();
    window.location.href = this.rout.url;
  }

  private updateSala() {
    this.sala.klinika = this.data.klinika;
    this.sala.name = this.naziv;
    this.sala.brojsale = this.broj
    let res = this.salaService.updateSala(this.sala);
    res.subscribe((res) => {
      if (res == null) {
        this.snackBar.open('Greska pri izmeni!', 'U redu', { duration: 2000 });
      } else {

        this.snackBar.open('Uspesno ste izmenili salu!', 'U redu', { duration: 2000 });
      }
    });
    this.dialogRef.close();
    window.location.href = this.rout.url;
  }

  private deleteSala() {
    let res = this.salaService.deleteSala(this.sala.id);
    res.subscribe((res) => {
      this.snackBar.open('Uspesno ste obrisali salu!', 'U redu', { duration: 1000 });
    });
    this.dialogRef.close();
    window.location.href = this.rout.url;
  }

  private timeFormatHandler() {
    this.broj = this.broj.replace(/\D+/, '');
  }

}
