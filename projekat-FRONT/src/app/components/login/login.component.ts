import { PutanjaService } from './../../putanje/putanje.service';
import { map } from 'rxjs/operators';
import { AuthService } from './../../services/authService/auth.service';
import { PacijentService } from './../../services/pacijentServices/pacijent.service';
import { User } from './../../models/user.model';
import { AdminKlinike } from './../../models/adminKlinike.model';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminKlinikeService } from 'src/app/services/admin-klinike.service';
import { LekarService } from 'src/app/services/lekar.service';
import { Lekar } from 'src/app/models/lekar.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Roles: any = ['AdminKlinike', 'User', 'ADMIN_K_C', 'PACIJENT', 'LEKAR', 'ADMIN_K'];   //Prekopirano iz register.component.ts
  username: string;
  password: string;
  user: any;    //Objekat za kastovanje onoga sto dodje sa servera (za logovanje i prebacivanje stranica)
  adminiKlinike: AdminKlinike[]
  admin: AdminKlinike
  lekari: Lekar[]
  lekar: Lekar
  dataInvalid = false;

  constructor(private service: LoginService, private route: Router, private pacijentService: PacijentService, private adminKlinikeService: AdminKlinikeService, private lekarService: LekarService,
    private authService: AuthService, private putanjaService: PutanjaService) { }

  ngOnInit() {
  }

  currentUser

  onSubmit() {

    this.authService.login(this.username, this.password).subscribe(
      auth => {
        this.service.getUserData().subscribe(
          user => {
            console.log(user);
            if (user.authorities[0].authority == 'ROLE_PACIJENT') {
              this.route.navigateByUrl('pacijentHomePage');
            } else if (user.authorities[0].authority == 'ROLE_ADMIN') {
              this.route.navigateByUrl('adminKHomePage');
            } else if (user.authorities[0].authority == 'ROLE_LEKAR') {
              this.route.navigateByUrl('lekarHomePage');
            } else if (user.authorities[0].authority == 'ROLE_ADMIN_KLINICKOG_CENTRA') {
              console.log(user);
              this.route.navigateByUrl('adminKcHomePage');
            } else {
              alert('Vas zahtev jos uvek nije potvrdjen');
            }
          }
        );
      },
      error => {
        console.log(error.status);
        if (error.status == 400) {
          this.dataInvalid = true;
        } else {
          alert('Nalog nije aktiviran')
        }
      }
    );
  }
}
