import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LekarService } from 'src/app/services/lekar.service';
import { Lekar } from 'src/app/models/lekar.model';
import { MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/services/authService/auth.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-lekar',
  templateUrl: './lekar.component.html',
  styleUrls: ['./lekar.component.css']
})
export class LekarComponent implements OnInit {
  idLekara: number;
  lekar: Lekar;
  firstLogin: boolean;
  lozinka: string;
  potvrdiLozinku: string;
  constructor(private authService: AuthService,private loginService: LoginService, private route: ActivatedRoute, private service: LekarService, private snackBar: MatSnackBar, private router: Router) {
    this.dobaviUlogovanogLekara();
  }

  ngOnInit() {
  }

  public dobaviUlogovanogLekara() {
    this.service.getLekaraIzBaze().subscribe(
      data => {
        if (data != null) {
          this.lekar = data;
          this.firstLogin=data.firstLogin;
          console.log(this.firstLogin);
        } else {
          alert('Niste uneli odgovarajuce parametre!');
        }
      }
    );
  }

  public onSubmit(): void {
    if (this.lozinka.length < 8) {
      this.snackBar.open('Lozinka mora da ima barem 8 karaktera!', 'U redu', { duration: 10000 });
      return;
    } else {
      if (this.potvrdiLozinku === this.lozinka) {
        this.snackBar.open('Uspesno ste promenili lozinku', 'U redu', { duration: 10000 });
        this.lekar.firstLogin = false;
        this.lekar.user.password = this.lozinka;
        console.log(this.lekar);
        this.service.updatelekar(this.lekar);
        this.service.updateUser(this.lekar.user);
        this.authService.login(this.lekar.user.username, this.lozinka);
        
        window.location.href = this.router.url;
      } else {
        this.snackBar.open('Vase Lozinke se ne podudaraju!', 'U redu', { duration: 10000 });
        return;
      }
    }
  }
  odjaviMe(){
    this.authService.logout();
  }
}
