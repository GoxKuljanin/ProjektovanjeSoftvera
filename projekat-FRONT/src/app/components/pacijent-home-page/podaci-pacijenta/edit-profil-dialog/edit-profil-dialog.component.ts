import { Router } from '@angular/router';
import { User } from './../../../../models/user.model';
import { Pacijent } from 'src/app/models/pacijent';
import { Component, OnInit, Inject } from '@angular/core';
import { PacijentService } from '../../../../services/pacijentServices/pacijent.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-profil-dialog',
  templateUrl: './edit-profil-dialog.component.html',
  styleUrls: ['./edit-profil-dialog.component.css']
})
export class EditProfilDialogComponent implements OnInit {

  modifikovano: User;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditProfilDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public pacijentService: PacijentService, private rout: Router) { }

  ngOnInit() {
  }
  public update(): void {
    console.log(this.data);
    console.log('Pokrenut postupak modifikacije!');
    console.log(this.data);
    this.pacijentService.azurirajPacijenta(this.data).subscribe(
      res => {
        console.log(res);
        this.modifikovano = res;
      }
    );

    this.snackBar.open('Uspešno modifikovan profil: ', 'U redu', { duration: 2500 });
    window.location.href = this.rout.url;
  }
  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste!', 'U redu', { duration: 1000 });
  }
}
