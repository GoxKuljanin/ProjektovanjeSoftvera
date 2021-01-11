import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdminKlinikeService } from 'src/app/services/admin-klinike.service';
import { ActivatedRoute } from '@angular/router';
import { Sala, ZauzetiDatumi, SalaSaTerminom } from 'src/app/models/Sala.model';
import { ɵangular_packages_common_common_i } from '@angular/common';
import { MatDialog } from '@angular/material';
import { SaleDialogComponent } from './sale-dialog/sale-dialog.component';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-lista-sala',
  templateUrl: './lista-sala.component.html',
  styleUrls: ['./lista-sala.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ListaSalaComponent implements OnInit {
  search: string
  sale: Sala[]
  listSource: SalaSaTerminom[] = []
  listSearch: SalaSaTerminom[] = []
  listFilter: SalaSaTerminom[] = []
  pomocni: SalaSaTerminom
  listSourceRES: SalaSaTerminom[] = []
  datumiSale: ZauzetiDatumi[]
  myDate = new Date();
  naziviSala: string[] = ["Sve sobe", "Laboratorija", "Ordinacija", "Kancelarija"];
  selectedNaziv: string
  idKlinike: number
  constructor(public dialog: MatDialog, private servis: AdminKlinikeService, private route: ActivatedRoute,private salaService: SaleService) {
    this.dobaviUlogovanogAdminaKLinike();
    
  }
  ider: number
  datumi: ZauzetiDatumi[] = [{ day: 1, month: 11, year: 2019, sala_id: 1 }, { day: 2, month: 11, year: 2019, sala_id: 1 }, { day: 15, month: 11, year: 2019, sala_id: 1 }, { day: 17, month: 11, year: 2019, sala_id: 1 },
  { day: 22, month: 11, year: 2019, sala_id: 1 }, { day: 23, month: 11, year: 2019, sala_id: 1 }, { day: 25, month: 11, year: 2019, sala_id: 1 }, { day: 12, month: 11, year: 2019, sala_id: 1 },
  { day: 3, month: 11, year: 2019, sala_id: 2 }, { day: 5, month: 11, year: 2019, sala_id: 2 }, { day: 8, month: 11, year: 2019, sala_id: 2 }, { day: 22, month: 11, year: 2019, sala_id: 2 }]
  ngOnInit() {
    
  }

  public dobaviUlogovanogAdminaKLinike() {
    this.servis.getAdminaIzBaze().subscribe(
      data => {
        if (data != null) {
          this.idKlinike = data.klinika.id;
          this.salaService.getSaleByIdKlinike(this.idKlinike).subscribe(
            data => {
              this.sale = data;
              for (let i = 0; i < this.sale.length; i++) {
                this.pomocni = new SalaSaTerminom;
                this.pomocni.id = this.sale[i].id;
                this.pomocni.brojsale = this.sale[i].brojsale;
                this.pomocni.name = this.sale[i].name;
                this.pomocni.day = 15;
                this.pomocni.month = 12;
                this.pomocni.year = 2019;
                this.listSource.push(this.pomocni);
              }
              this.listSourceRES = this.listSource;
              this.listSearch = this.listSource;
              this.listFilter = this.listSource;
              this.listSource[0].day = 16;
            }
          );
        } else {
          alert('Niste uneli odgovarajuce parametre!');
        }
      }
    );
  }

  Search() {
    if (this.search == "") {
      this.listSource = this.listSearch;
    } else {
      this.listSource = this.listSearch.filter(res => {
        return res.name.toLocaleLowerCase().match(this.search.toLocaleLowerCase()) ||
          res.id.toString().toLocaleLowerCase().match(this.search.toLocaleLowerCase())
      });
    }
  }

  private FilterNazive() {
    if (this.selectedNaziv == "Sve sobe") {
      this.listFilter = this.listSourceRES;
      this.listSearch = this.listSourceRES;
      this.listSource = this.listSourceRES;
      this.search = ""
    } else {
      this.listFilter = this.listSourceRES.filter(res => { return res.name.toLocaleLowerCase().match(this.selectedNaziv.toLocaleLowerCase()) });
      this.listSearch = this.listFilter;
      this.listSource = this.listFilter;
      this.search = ""
    }
  }

  private openAddDialog() {
    const flag: number = 0;
    const dialogRef = this.dialog.open(SaleDialogComponent, {
      data: { flag: flag, klinika: this.sale[0].klinika }
    });
    dialogRef.afterClosed().subscribe(result => {
    }
    )
  };

  private openDeleteDialog(sala: Sala) {
    const flag: number = 1;
    const dialogRef = this.dialog.open(SaleDialogComponent, {
      data: { flag: flag, sala: sala, klinika: this.sale[0].klinika }
    });
    dialogRef.afterClosed().subscribe(result => {
    }
    )
  };

  private openEditDialog(sala: Sala) {
    const flag: number = 2;
    const dialogRef = this.dialog.open(SaleDialogComponent, {
      data: { flag: flag, sala: sala, klinika: this.sale[0].klinika }
    });
    dialogRef.afterClosed().subscribe(result => {
    }
    )
  };
  dateClass = (d: Date) => {
    const date = d.getDate();
    const month = d.getMonth();
    this.datumiSale = []
    let j = 0;
    for (let i = 0; i < this.datumi.length; i++) {
      if (this.datumi[i].sala_id == this.ider) {

        this.datumiSale[j] = this.datumi[i]
        j++;
      }
    }

    for (let i = 0; i < this.datumiSale.length; i++) {
      if (date == this.datumiSale[i].day && month == this.datumiSale[i].month) {
        return 'example-custom-date-class';
      }
    }
    return undefined;
    //return ((date === 1 && month ===11) || (date === 1 && month ===11)) ? 'example-custom-date-class' : undefined;
  }
  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 1 && day !== 2 && day !== 3 && day !== 4 && day !== 5 && day !== 6;
  }

  streamOpened(id: number) {
    this.ider = id;
  }

}
