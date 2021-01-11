import { Component, OnInit } from '@angular/core';
import { Pacijent } from 'src/app/models/pacijent';
import { ActivatedRoute } from '@angular/router';
import { PacijentService } from 'src/app/services/pacijentServices/pacijent.service';
import { LekarService } from 'src/app/services/lekar.service';

@Component({
  selector: 'app-prikaz-pacijenta',
  templateUrl: './prikaz-pacijenta.component.html',
  styleUrls: ['./prikaz-pacijenta.component.css']
})
export class PrikazPacijentaComponent implements OnInit {
  pacijent: Pacijent = new Pacijent();
  idLekar: number;
  pregledaniPacijenti: Pacijent[];
  isPregledan: boolean = false;
  constructor(private service: LekarService, private pacijentService: PacijentService, private route: ActivatedRoute) {
    this.dobaviUlogovanogLekara();
    let idPacijenta = parseInt(this.route.snapshot.paramMap.get('id'));
    let res = this.pacijentService.getPacijenta(idPacijenta).subscribe(
      data => {
        this.pacijent = data;
        this.service.getPregledaniPacijentiByLekarId(this.idLekar).subscribe(
          data => {
            this.pregledaniPacijenti = data;
            for (let i = 0; i < this.pregledaniPacijenti.length; i++) {
              if (this.pregledaniPacijenti[i].id == this.pacijent.id) {
                this.isPregledan = true;
                return;
              }
            }
          }
        );
      }
    );
  }

  ngOnInit() {
  }

  
  public dobaviUlogovanogLekara() {
    this.service.getLekaraIzBaze().subscribe(
      data => {
        if (data != null) {
          this.idLekar = data.id;
        } else {
          alert('Niste uneli odgovarajuce parametre!');
        }
      }
    );
  }
}
