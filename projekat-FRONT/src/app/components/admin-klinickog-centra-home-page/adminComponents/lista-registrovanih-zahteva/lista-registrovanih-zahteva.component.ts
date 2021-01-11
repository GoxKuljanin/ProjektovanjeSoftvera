import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from './../../../../models/user.model';
import { AdminKlinickogCentraService } from './../../../../services/adminKCServices/admin-klinickog-centra.service';
import { Component, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material';
import { OdbijZahtevDialogComponent } from '../../odbij-zahtev-dialog/odbij-zahtev-dialog.component';

@Component({
  selector: 'app-lista-registrovanih-zahteva',
  templateUrl: './lista-registrovanih-zahteva.component.html',
  styleUrls: ['./lista-registrovanih-zahteva.component.css']
})
export class ListaRegistrovanihZahtevaComponent implements OnInit {

  model: User[] = [];

  constructor(private service: AdminKlinickogCentraService, private http: HttpClient,
            public dialog: MatDialog) { }

  ngOnInit() {
    let res = this.service.getListaRegistrovanih().subscribe(
      data => {
        this.model = data;
      }
    );
  }

  public onPrihvati(models: User) {
    let res = this.service.dodajPacijentaUBazu(models).subscribe(
      pacijent => {
        //console.log(pacijent);
        for (let zaBrisanje of this.model) {
          if (models.username === zaBrisanje.username) {
            this.model.splice(this.model.indexOf(zaBrisanje), 1);
            break;
          }
        }
      }
    );
  }

  public onOdbij(models: User) {

    const dialogRef = this.dialog.open(OdbijZahtevDialogComponent, {data: models});
    dialogRef.afterClosed().subscribe(result => {

    });

    // let params = new HttpParams().set("username", models.username)
    // this.http.delete('http://localhost:8088/obrisiZahtev', { params: params }).subscribe(
    //   data => {
    //     alert('Zahtev uspesno obrisan!');
    //   }
    // );
    // for (let user of this.model) {
    //   if (models.username === user.username) {
    //     this.model.splice(this.model.indexOf(user), 1);
    //     break;
    //   }
    // }
  }
}
