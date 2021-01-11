import { Component, OnInit } from '@angular/core';
import { ZahtevZaZakazivanje } from '../../../../models/zahtevZakazivanjaPregleda.model';
import { PregledService } from 'src/app/services/pregled.service';
import { AdminKlinikeService } from 'src/app/services/admin-klinike.service';
import { AdminKlinike } from 'src/app/models/adminKlinike.model';
import { Pregled, Pacijent } from 'src/app/models/pacijent';
import { Lekar } from 'src/app/models/lekar.model';
import { Klinika } from 'src/app/models/klinika.model';
import { MatDialog } from '@angular/material';
import { ZahteviZakazivanjaDialogComponent } from './zahtevi-zakazivanja-dialog/zahtevi-zakazivanja-dialog.component';

@Component({
  selector: 'app-zahtevi-zakazivanja-pregleda',
  templateUrl: './zahtevi-zakazivanja-pregleda.component.html',
  styleUrls: ['./zahtevi-zakazivanja-pregleda.component.css']
})
export class ZahteviZakazivanjaPregledaComponent implements OnInit {
  listSource : Pregled[]
  admin: AdminKlinike = new AdminKlinike();
  idk:number;
  constructor(private adminKlinikeService: AdminKlinikeService, public dialog: MatDialog, private pregledService: PregledService) {
    this.dobaviUlogovanogAdminaKLinike()
    
   }

  ngOnInit() {
    
  }
  public dobaviUlogovanogAdminaKLinike() {
    this.adminKlinikeService.getAdminaIzBaze().subscribe(
      data => {
        if (data != null) {
          this.admin = data;
          this.idk= data.klinika.id;
          this.adminKlinikeService.getZahteviZakazivanjaByIdKlinike(this.idk).subscribe(zahtevi=>{
            this.listSource = zahtevi;
            for(let i=0;i<this.listSource.length;i++){
              this.pregledService.findPacijentByPregledId(this.listSource[i].id).subscribe(pacijent=>{
                console.log(pacijent);
                this.listSource[i].pacijent=pacijent;
              });
            }
            console.log(this.listSource[0])
          })
        } else {
          alert('Niste uneli odgovarajuce parametre!');
        }
      }
    );
  }
  public openDialog(zahtev: Pregled) {

    const dialogRef = this.dialog.open(ZahteviZakazivanjaDialogComponent, {
      data: { zahtev: zahtev}
    });
    dialogRef.afterClosed().subscribe(result => {

    });

  }
}
