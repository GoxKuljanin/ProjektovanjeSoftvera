import { Sala } from 'src/app/models/Sala.model';
import { Lek, Dijagnoza, Izvestaj, ZdravstveniKarton } from './../../../../models/pacijent';
import { Component, OnInit } from '@angular/core';
import { Pacijent, Pregled } from 'src/app/models/pacijent';
import { PacijentService } from 'src/app/services/pacijentServices/pacijent.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ZakaziPregledDialogComponent } from './zakazi-pregled-dialog/zakazi-pregled-dialog.component';
import { SaleService } from 'src/app/services/sale.service';
import { Time } from '@angular/common';
import { LekarService } from 'src/app/services/lekar.service';
import { Lekar } from 'src/app/models/lekar.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-zapocni-pregled',
  templateUrl: './zapocni-pregled.component.html',
  styleUrls: ['./zapocni-pregled.component.css']
})
export class ZapocniPregledComponent implements OnInit {
  izvestaj: Izvestaj = new Izvestaj();
  startDate: Date = new Date();
  datum: Date= new Date();
  lek: Lek[] = [{ id: 0, sifra: "", naziv: "", opis: "" }];
  dijagnoza: Dijagnoza = new Dijagnoza();
  selectedSala:Sala= new Sala();
  sale: Sala[] = [{ id: 0, brojsale: "", name: "", klinika: null }];
  pregled: Pregled = new Pregled();
  zdravstveniKarton: ZdravstveniKarton = new ZdravstveniKarton();
  pacijent: Pacijent = new Pacijent();
  lekar:Lekar= new Lekar();
  user:User = new User();
  idLekar: number
  constructor(private lekarService: LekarService , private servis: PacijentService, private salaServis: SaleService, private route: ActivatedRoute, public dialog: MatDialog) {
    this.dobaviUlogovanogLekara();
    let idPacijenta = parseInt(this.route.snapshot.paramMap.get('id'));
    let res = this.servis.getPacijenta(idPacijenta).subscribe(
      data => {
        this.pacijent = data;
        this.zdravstveniKarton= data.zdravstveniKarton;
      }
    );
    this.salaServis.getSale().subscribe(data=>{
      this.sale=data;
    });
   }

  ngOnInit() {
    
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

  private openAddDialog() {
    const dialogRef = this.dialog.open(ZakaziPregledDialogComponent, {
      data: { lekar: this.lekar,pacijent:this.pacijent }
    });
    dialogRef.afterClosed().subscribe(result => {

    }
    )
  };

  private onSubmit(){
    this.izvestaj.pregled = this.pregled;
    this.izvestaj.pregled.sala = this.selectedSala;
    this.izvestaj.pregled.pacijent = this.pacijent;
    this.izvestaj.pregled.cena = this.pregled.cena;
    let month = this.datum.getMonth();
    let day = this.datum.getDate();
    let year = this.datum.getFullYear();
    let dateString = `${month}.${day}.${year}`;
    //this.izvestaj.pregled.termin = dateString;
    console.log(this.izvestaj);
  }
}
