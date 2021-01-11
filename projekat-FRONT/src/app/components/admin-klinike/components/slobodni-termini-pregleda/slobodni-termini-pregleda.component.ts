import { Component, OnInit } from '@angular/core';
import { Pregled } from 'src/app/models/pacijent';
import { AdminKlinikeService } from 'src/app/services/admin-klinike.service';
import { Klinika } from 'src/app/models/klinika.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SlobodniTerminiDialogComponent } from './slobodni-termini-dialog/slobodni-termini-dialog.component';
import { style } from '@angular/animations';

@Component({
  selector: 'app-slobodni-termini-pregleda',
  templateUrl: './slobodni-termini-pregleda.component.html',
  styleUrls: ['./slobodni-termini-pregleda.component.css']
})
export class SlobodniTerminiPregledaComponent implements OnInit {
  pregledi:Pregled[];
  klinika: Klinika= new Klinika();

  constructor(private adminKlinikeService: AdminKlinikeService,public dialog: MatDialog) { 
    this.dobaviUlogovanogAdminaKLinike();
    this.adminKlinikeService.getAllSlobodniTerminiPregleda().subscribe(
      data => {
        this.pregledi = data;
      }
    );
  }
  
  ngOnInit() {
  }
  public dobaviUlogovanogAdminaKLinike() {
    this.adminKlinikeService.getAdminaIzBaze().subscribe(
      data => {
        if (data != null) {
          this.klinika = data.klinika;
          console.log(data.klinika);
        } else {
          alert('Niste uneli odgovarajuce parametre!');
        }
      }
    );
  }

  private openAddDialog() {
    const flag: number = 0;
    const dialogRef = this.dialog.open(SlobodniTerminiDialogComponent, {
      data: { flag: flag, klinika: this.klinika }
    });
    dialogRef.afterClosed().subscribe(result => {

    }
    )
  };

  private openDeleteDialog() {
    
  };
}
