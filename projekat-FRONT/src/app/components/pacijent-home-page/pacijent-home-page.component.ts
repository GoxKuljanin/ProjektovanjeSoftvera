import { AuthService } from './../../services/authService/auth.service';
import { PacijentService } from './../../services/pacijentServices/pacijent.service';
import { User } from './../../models/user.model';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Pacijent } from 'src/app/models/pacijent';

@Component({
  selector: 'app-pacijent-home-page',
  templateUrl: './pacijent-home-page.component.html',
  styleUrls: ['./pacijent-home-page.component.css']
})
export class PacijentHomePageComponent implements OnInit {


  constructor( private authService: AuthService, private service: LoginService, private pacijentService: PacijentService) { 
  }

  ngOnInit() {
      //console.log(this.service.user);
      //this.user = this.service.user;
      
      //this.dobaviUlogovanogPacijenta(this.service.user.email);
      
  }
    //PREBACENO U PACIJENT-HOME-PAGE.COMPONENT.HTML
  // public dobaviUlogovanogPacijenta(email:string){
  //     this.pacijentService.getPacijentaIzBaze(email).subscribe(
  //       data=>{
  //           if(data != null){
  //             this.pacijent = data;
  //           }else{
  //             alert('Niste uneli odgovarajuce parametre!');
  //           }
  //       }
  //     );
  // }

  onOdjaviMe(){
    this.authService.logout();
  }

}
