import { AuthService } from 'src/app/services/authService/auth.service';
import { PacijentService } from 'src/app/services/pacijentServices/pacijent.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { User } from 'src/app/models/user.model';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-edit-lozinka',
  templateUrl: './edit-lozinka.component.html',
  styleUrls: ['./edit-lozinka.component.css']
})
export class EditLozinkaComponent implements OnInit {

  modifikovano: User;
  stara: string;
  novaLozinka: string;
  potvrdjenaLozinka: string;

  constructor(public snackBar: MatSnackBar, public dialogRef: MatDialogRef<EditLozinkaComponent>,
          @Inject(MAT_DIALOG_DATA) public data: any, private rout: Router, private service: PacijentService, private auth: AuthService) { }

  ngOnInit() {
  }

  update(){
      if(this.novaLozinka == "" || this.novaLozinka == undefined || this.potvrdjenaLozinka == "" || this.potvrdjenaLozinka == undefined){
        this.snackBar.open('Niste uneli sve parametre!', 'U redu', { duration: 10000 }); 
      }else if(this.novaLozinka != this.potvrdjenaLozinka){
        this.snackBar.open('Lozinke se ne poklapaju', 'U redu', { duration: 10000 });
      }else if(this.novaLozinka.length < 8){
        this.snackBar.open('Lozinka mora da ima barem 8 karaktera!', 'U redu', { duration: 10000 });
      }else {
        this.data.password = this.novaLozinka;
        this.service.azurirajSifraPacijenta(this.data).subscribe(
          res =>{
            this.snackBar.open('Uspesno ste promenili Vasu sifru.', 'U redu', { duration: 10000 });
          }
        );
      }
  }
  cancel(){
    this.dialogRef.close();
    this.snackBar.open('Odustali ste!', 'U redu', { duration: 1000 });
  }
}
