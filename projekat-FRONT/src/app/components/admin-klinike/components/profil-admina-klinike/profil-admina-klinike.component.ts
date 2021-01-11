import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminKlinikeService } from 'src/app/services/admin-klinike.service';
import { MatDialog } from '@angular/material';
import { AdminKlinike } from 'src/app/models/adminKlinike.model';
import { User } from 'src/app/models/user.model';
import { AkEditProfilDialogComponent } from './dialog/profil-admina-klinike/ak-edit-profil-dialog/ak-edit-profil-dialog.component';
import { AkEditPasswordDialogComponent } from './dialog/ak-edit-password-dialog/ak-edit-password-dialog.component';

@Component({
  selector: 'app-profil-admina-klinike',
  templateUrl: './profil-admina-klinike.component.html',
  styleUrls: ['./profil-admina-klinike.component.css']
})
export class ProfilAdminaKlinikeComponent implements OnInit {
  idAdmina: number;
  admin: AdminKlinike;
  user: User;

  constructor(private route: ActivatedRoute, private adminKlinikeService: AdminKlinikeService, public dialog: MatDialog) {
    this.dobaviUlogovanogAdminaKLinike();

  }

  ngOnInit() {
  }
  public openDialog(id: number, firstname: string, lastname: string, adress: string, city: string, country: string, username: string, phoneNumber: string) {

    const dialogRef = this.dialog.open(AkEditProfilDialogComponent, {
      data: { id: id, firstname: firstname, lastname: lastname, adress: adress, city: city, country: country, username: username, phoneNumber: phoneNumber }
    });
    dialogRef.afterClosed().subscribe(result => {

    });

  }

  public openPasswordnDialog(id: number) {

    const dialogRef = this.dialog.open(AkEditPasswordDialogComponent, {
      data: { id: id }
    });
    dialogRef.afterClosed().subscribe(result => {

    });

  }

  public dobaviUlogovanogAdminaKLinike() {
    this.adminKlinikeService.getAdminaIzBaze().subscribe(
      data => {
        if (data != null) {
          this.admin = data;
          this.user = this.admin.user;
        } else {
          alert('Niste uneli odgovarajuce parametre!');
        }
      }
    );
  }
}
