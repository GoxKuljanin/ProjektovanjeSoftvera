import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminKlinikeService } from 'src/app/services/admin-klinike.service';
import { AdminKlinikeComponent } from '../../admin-klinike.component';
import { AdminKlinike } from 'src/app/models/adminKlinike.model';
import { Cena } from 'src/app/models/cena.model';
import { Klinika } from 'src/app/models/klinika.model';

@Component({
  selector: 'app-cenovnik',
  templateUrl: './cenovnik.component.html',
  styleUrls: ['./cenovnik.component.css']
})
export class CenovnikComponent implements OnInit {
  idAdmina: number
  admin: AdminKlinike
  cene: Cena[]
  klinika: Klinika = { id: 0, naziv: "", opis: "", adresa: "", ocenaklinike: 0 }
  constructor(private route: ActivatedRoute, private adminKlinikeService: AdminKlinikeService) {
    this.dobaviUlogovanogAdminaKLinike();
  }

  ngOnInit() {

  }

  public dobaviUlogovanogAdminaKLinike() {
    this.adminKlinikeService.getAdminaIzBaze().subscribe(
      data => {
        if (data != null) {
          this.admin = data;
          this.klinika = this.admin.klinika;
          this.adminKlinikeService.getCeneByIdKlinike(this.klinika.id).subscribe(data => {
            this.cene = data;
          });
        } else {
          alert('Niste uneli odgovarajuce parametre!');
        }
      }
    );
  }

}
