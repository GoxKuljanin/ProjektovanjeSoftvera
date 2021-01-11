import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Lekar } from 'src/app/models/lekar.model';
import { LekarService } from 'src/app/services/lekar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Klinika } from 'src/app/models/klinika.model';
import { AdminKlinikeService } from 'src/app/services/admin-klinike.service';
import { RegisterServiceService } from 'src/app/services/register-service.service';

@Component({
  selector: 'app-lekari-dialog',
  templateUrl: './lekari-dialog.component.html',
  styleUrls: ['./lekari-dialog.component.css']
})
export class LekariDialogComponent implements OnInit {
  public lekar: Lekar = new Lekar();
  public user: User = new User();
  klinika: Klinika;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<LekariDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public lekarService: LekarService,
    public service: AdminKlinikeService, private rout: Router) {
    console.log(data);
    if (data.flag == 1) {
      this.lekar = data.lekar;
      this.user = this.lekar.user;
    } else if (data.flag == 0) {
      this.lekar.user = this.user;
    }
  }

  ngOnInit() {
  }
  public addLekar(): void {
    this.lekar.klinika = this.data.klinika;
    this.lekar.user = this.user;
    let res = this.lekarService.addUser(this.lekar);
    res.subscribe((res) => {
      if (res == null) {
        this.snackBar.open('Vec postoji korisnicki nalog sa unetim E-mailom!', 'U redu', { duration: 1000 });
      } else {

        this.snackBar.open('Uspesno ste se registrovali kao korisnik!', 'U redu', { duration: 1000 });
        window.location.href = this.rout.url;
      }
    });
    this.dialogRef.close();
    this.snackBar.open('Lekar dodat.', 'U redu', { duration: 1000 });
  }
  public deleteLekar(): void {
    let res = this.lekarService.deleteLekarAndUser(this.lekar.id);
    console.log(res);
    res.subscribe((res) => {
      if (res == null) {
        this.snackBar.open('Lekar ima zakazane preglede!', 'U redu', { duration: 1000 });
      } else {

        this.snackBar.open('Uspesno ste obrisali lekara!', 'U redu', { duration: 1000 });
        window.location.href = this.rout.url;
      }
    });
    this.dialogRef.close();
    this.snackBar.open('Lekar obrisan.', 'U redu', { duration: 1000 });
  }
  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste!', 'U redu', { duration: 1000 });
  }
}
