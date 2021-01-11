import { PacijentService } from './../../../services/pacijentServices/pacijent.service';
import { User } from './../../../models/user.model';
import { Pacijent, ZdravstveniKarton, Pregled } from './../../../models/pacijent';
import { LoginService } from './../../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-zdravstveni-karton',
  templateUrl: './zdravstveni-karton.component.html',
  styleUrls: ['./zdravstveni-karton.component.css']
})
export class ZdravstveniKartonComponent implements OnInit {

  pacijent: User;
  karton: ZdravstveniKarton;
  ucitano = false;
  imaKarton = false;
  //pregledi: Pregled[] = [];

  constructor(private service: PacijentService) { }

  ngOnInit() {
    //this.pacijent = this.service.user
    this.service.getZdravstveniKarton(localStorage.getItem("logedInUser")).subscribe(
      data=>{
          this.karton = data;
          console.log(this.karton);
          this.ucitano = true;
          if(this.karton.izvestaj != null){
              this.imaKarton = true;
          }
          //this.pregledi = this.kartoni.pregled; //Nalazi se u uzvestaju
      }
    );
  }

}
