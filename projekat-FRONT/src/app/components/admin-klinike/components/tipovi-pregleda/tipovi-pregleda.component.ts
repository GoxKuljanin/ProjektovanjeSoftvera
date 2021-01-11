import { Component, OnInit } from '@angular/core';
import { TipPregleda } from 'src/app/models/tipPregleda.model';
import { TipPregledaService } from 'src/app/services/tip-pregleda.service';
import { MatDialog } from '@angular/material';
import { TipoviPregledaDialogComponent } from './tipovi-pregleda-dialog/tipovi-pregleda-dialog.component';
import { AdminKlinikeService } from 'src/app/services/admin-klinike.service';
import { Klinika } from 'src/app/models/klinika.model';

@Component({
  selector: 'app-tipovi-pregleda',
  templateUrl: './tipovi-pregleda.component.html',
  styleUrls: ['./tipovi-pregleda.component.css']
})
export class TipoviPregledaComponent implements OnInit {
  search: string;
  tipoviPregleda: TipPregleda[];
  listSource: TipPregleda[];
  klinika:Klinika= new Klinika();

  constructor(public dialog: MatDialog, private tipPregledaService: TipPregledaService,private adminKlinikeService: AdminKlinikeService) {
    this.dobaviUlogovanogLekara();
    
  }

  ngOnInit() {
  }
  public dobaviUlogovanogLekara() {
    this.adminKlinikeService.getAdminaIzBaze().subscribe(
      data => {
        if (data != null) {
          console.log(data.klinika);
          this.klinika = data.klinika;
          this.tipPregledaService.getTipoviPregledaByIdKlinike(this.klinika.id).subscribe(
            data => {
              this.tipoviPregleda = data;
              this.listSource = data;
            }
          );
        } else {
          alert('Niste uneli odgovarajuce parametre!');
        }
      }
    );
  }
  private openAddDialog() {
    const flag: number = 0;
    const dialogRef = this.dialog.open(TipoviPregledaDialogComponent, {
      data: { flag: flag }
    });
    dialogRef.afterClosed().subscribe(result => {
    }
    )
  };

  private openDeleteDialog(tipPregleda: TipPregleda) {
    const flag: number = 1;
    const dialogRef = this.dialog.open(TipoviPregledaDialogComponent, {
      data: { flag: flag, tipPregleda: tipPregleda }
    });
    dialogRef.afterClosed().subscribe(result => {
    }
    )
  };

  private openEditDialog(tipPregleda: TipPregleda) {
    const flag: number = 2;
    const dialogRef = this.dialog.open(TipoviPregledaDialogComponent, {
      data: { flag: flag, tipPregleda: tipPregleda }
    });
    dialogRef.afterClosed().subscribe(result => {
    }
    )
  };

  private searchHandler() {
    if (this.search == "") {
      this.listSource = this.tipoviPregleda;
    } else {
      this.listSource = this.listSource.filter(res => {
        return res.naziv.toLocaleLowerCase().match(this.search.toLocaleLowerCase())
      });
    }
  }
}
