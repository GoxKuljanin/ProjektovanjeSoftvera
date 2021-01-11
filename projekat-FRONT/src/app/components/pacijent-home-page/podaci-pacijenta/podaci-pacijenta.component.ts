import { EditLozinkaComponent } from './edit-lozinka/edit-lozinka.component';
import { LoginService } from './../../../services/login.service';
import { PacijentService } from './../../../services/pacijentServices/pacijent.service';
import { MatDialog } from '@angular/material';
import { Pacijent } from './../../../models/pacijent';
import { User } from './../../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { EditProfilDialogComponent } from './edit-profil-dialog/edit-profil-dialog.component';

@Component({
  selector: 'app-podaci-pacijenta',
  templateUrl: './podaci-pacijenta.component.html',
  styleUrls: ['./podaci-pacijenta.component.css']
})
export class PodaciPacijentaComponent implements OnInit {

  //user: User;
  pacijent: Pacijent;

  constructor(private pacijentService: PacijentService, private service: LoginService, public dialog: MatDialog, public dialog2: MatDialog) {

  }

  ngOnInit() {

    this.dobaviUlogovanogPacijenta(localStorage.getItem('logedInUser'));     //prije: this.service.user.email
  }

  public dobaviUlogovanogPacijenta(username: string) {
    this.pacijentService.getPacijentaIzBaze(username).subscribe(
      data => {
        if (data != null) {
          this.pacijent = data;
        } else {
          alert('Niste uneli odgovarajuce parametre!');
        }
      }
    );
  }
  public openDialog(id: number, firstname: string, lastname: string, username: string, adress: string, city: string, country: string, phoneNumber: string) {

    const dialogRef = this.dialog.open(EditProfilDialogComponent, {
      data: { id: id, firstname: firstname, lastname: lastname, username: username, adress: adress, city: city, country: country, phoneNumber: phoneNumber }
    });
    dialogRef.afterClosed().subscribe(result => {


    });

  }

  public openDialogLozinka(id: number, password: string, firstname: string, lastname: string, username: string, adress: string, city: string, country: string, phoneNumber: string){
    const dialogRef = this.dialog2.open(EditLozinkaComponent, {
      data: { id: id, password: password, firstname: firstname, lastname: lastname, username: username, adress: adress, city: city, country: country, phoneNumber: phoneNumber }
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
