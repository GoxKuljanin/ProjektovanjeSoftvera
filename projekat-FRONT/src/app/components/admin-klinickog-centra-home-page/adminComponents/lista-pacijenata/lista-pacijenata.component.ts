import { AdminKlinickogCentraService } from './../../../../services/adminKCServices/admin-klinickog-centra.service';
import { Pacijent } from './../../../../models/pacijent';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-pacijenata',
  templateUrl: './lista-pacijenata.component.html',
  styleUrls: ['./lista-pacijenata.component.css']
})
export class ListaPacijenataComponent implements OnInit {

  pacijenti: Pacijent[] = [];

  constructor(private servis: AdminKlinickogCentraService) { }

  ngOnInit() {
    let res = this.servis.dobaviSvePacijenteIzBaze().subscribe(
      data=>{
        this.pacijenti = data;
      }
    );
  }

  public dobaviSvePacijente(){

  }
}
