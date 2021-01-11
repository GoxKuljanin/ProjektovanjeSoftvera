import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdminKlinikeService } from 'src/app/services/admin-klinike.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-ak-edit-profil-dialog',
  templateUrl: './ak-edit-profil-dialog.component.html',
  styleUrls: ['./ak-edit-profil-dialog.component.css']
})
export class AkEditProfilDialogComponent implements OnInit {
  user: User = { id: 0, firstname: "", lastname: "", city: "", country: "", adress: "", username: "", phoneNumber: "", password: "", uloga: "" };
  stariUser: User = { id: 0, firstname: "", lastname: "", city: "", country: "", adress: "", username: "", phoneNumber: "", password: "", uloga: "" };

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AkEditProfilDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    public adminKlinikeService: AdminKlinikeService, private rout: Router) {
    this.adminKlinikeService.getUserById(this.data.id).subscribe(
      data => {
        this.stariUser = data;
        this.user = this.stariUser;
      }
    );
  }

  ngOnInit() {
  }
  public update(): void {
    this.user.id = this.data.id;
    this.user.firstname = this.data.firstname;
    this.user.lastname = this.data.lastname;
    this.user.adress = this.data.adress;
    this.user.country = this.data.country;
    this.user.city = this.data.city;
    this.user.username = this.data.username;
    this.user.phoneNumber = this.data.phoneNumber;
    this.adminKlinikeService.updateUser(this.user);
    this.snackBar.open('Uspešno modifikovan profil: ', 'U redu', { duration: 2500 });
    window.location.href = this.rout.url;
  }
  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste!', 'U redu', { duration: 1000 });
  }
}
