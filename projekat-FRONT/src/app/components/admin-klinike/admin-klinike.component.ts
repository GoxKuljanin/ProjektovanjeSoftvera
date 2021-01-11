import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminKlinikeService } from 'src/app/services/admin-klinike.service';
import { AdminKlinike } from 'src/app/models/adminKlinike.model';
import { MatSnackBar } from '@angular/material';
import { empty } from 'rxjs';
import { AuthService } from 'src/app/services/authService/auth.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-admin-klinike',
  templateUrl: './admin-klinike.component.html',
  styleUrls: ['./admin-klinike.component.css']
})
export class AdminKlinikeComponent implements OnInit {
  idAdminaKlinike: number;
  admin: AdminKlinike= new AdminKlinike();
  firstLogin: boolean;
  lozinka: string;
  potvrdiLozinku: string;
  constructor(private loginService: LoginService, private authService: AuthService, private service: AdminKlinikeService, private route: ActivatedRoute, private snackBar: MatSnackBar, private router: Router) {
    this.dobaviUlogovanogAdminaKLinike();
    // this.idAdminaKlinike= parseInt(this.route.snapshot.paramMap.get('ida'));
    // this.service.getAdmin(this.idAdminaKlinike).subscribe(
    //   data => {
    //     this.admin = data;
    //     this.firstLogin=this.admin.firstLogin;
    //   }
    // );
  }

  ngOnInit() {


  }
  
  public dobaviUlogovanogAdminaKLinike() {
    this.service.getAdminaIzBaze().subscribe(
      data => {
        if (data != null) {
          this.admin = data;
          this.firstLogin=data.firstLogin;
          console.log(this.admin);
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
        this.admin.firstLogin = false;
        this.admin.user.password = this.lozinka;
        console.log(this.admin);
        this.service.updateAdminaK(this.admin);
        this.service.updateUser(this.admin.user);
        this.authService.login(this.admin.user.username, this.lozinka);
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
