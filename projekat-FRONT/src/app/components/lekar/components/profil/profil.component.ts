import { User } from './../../../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lekar } from 'src/app/models/lekar.model';
import { LekarService } from 'src/app/services/lekar.service';
import { ProfilDialogComponent } from './profil-dialog/profil-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  idLekara: number
  user: User = new User();
  lekar: Lekar = new Lekar();
  constructor(private route: ActivatedRoute, private lekarService: LekarService, private dialog: MatDialog) {
    this.dobaviUlogovanogLekara();

  }

  ngOnInit() {
  }

  public openDialog() {
    let flag = 0;
    const dialogRef = this.dialog.open(ProfilDialogComponent, {
      data: { lekar: this.lekar, flag: flag }
    });
    dialogRef.afterClosed().subscribe(result => {

    });

  }

  public openPasswordnDialog() {
    let flag = 1;
    const dialogRef = this.dialog.open(ProfilDialogComponent, {
      data: { lekar: this.lekar, flag: flag }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  public dobaviUlogovanogLekara() {
    this.lekarService.getLekaraIzBaze().subscribe(
      data => {
        if (data != null) {
          this.lekar = data;
          this.user = data.user;
        } else {
          alert('Niste uneli odgovarajuce parametre!');
        }
      }
    );
  }

}
