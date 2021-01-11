import { RegisterServiceService } from './../../services/register-service.service';
import { User } from './../../models/user.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  repeatPassword: string;

  Roles: any = ['AdminKlinike', 'User', 'ADMIN_K_C'];
  //public data: User = new User('0');
  public user: User = new User();
  //data.uloga: '0';

  constructor(private registerService : RegisterServiceService, private snackBar: MatSnackBar ) { }

  ngOnInit() {
  }

  public onSubmit(): void{


    if(this.user.password.length < 8){
      this.snackBar.open('Lozinka mora da ima barem 8 karaktera!', 'U redu', {duration: 10000});
      return;
    }else {
      if(this.repeatPassword === this.user.password){
        this.user.uloga = this.Roles[1];
     
        let res = this.registerService.saveUser(this.user);
        res.subscribe((res)=>{
          if(res == null ){
            alert('Vec postoji korisnicki nalog sa unetim E-mailom!');
          }else{
            alert('Uspesno ste se registrovali kao korisnik!');
            //if( res.uloga == this.Roles[1] )
          }
        });
      }else{
        this.snackBar.open('Vase Lozinke se ne podudaraju!', 'U redu', {duration: 10000});
        return;
      }
    }
  }

}
