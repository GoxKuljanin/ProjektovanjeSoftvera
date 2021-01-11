import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdminKlinikeService } from 'src/app/services/admin-klinike.service';
import { Router } from '@angular/router';
import { Klinika } from 'src/app/models/klinika.model';

@Component({
  selector: 'app-osnovni-podaci-dialog',
  templateUrl: './osnovni-podaci-dialog.component.html',
  styleUrls: ['./osnovni-podaci-dialog.component.css']
})
export class OsnovniPodaciDialogComponent implements OnInit {

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<OsnovniPodaciDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Klinika,
    public adminKlinikeService: AdminKlinikeService, private rout: Router) { }

  ngOnInit() {
  }
  public update(): void {
    this.adminKlinikeService.updateKliniku(this.data);
    this.snackBar.open('Uspešno modifikovan profil: ', 'U redu', { duration: 2500 });
    window.location.href = this.rout.url;
  }
  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste!', 'U redu', { duration: 1000 });
  }
}
