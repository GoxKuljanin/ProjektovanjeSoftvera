import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LekarService } from 'src/app/services/lekar.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Lekar } from 'src/app/models/lekar.model';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-profil-dialog',
  templateUrl: './profil-dialog.component.html',
  styleUrls: ['./profil-dialog.component.css']
})
export class ProfilDialogComponent implements OnInit {
  lekar: Lekar = new Lekar();
  flag:number;
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProfilDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: LekarService, private rout: Router,private authService: AuthService) { 
      this.lekar = data.lekar;
      this.flag=data.flag;
    }

  ngOnInit() {
  }
  public updateLekar(): void {
    this.service.updateUser(this.lekar.user);
    this.service.updatelekar(this.lekar);
    this.snackBar.open('Uspešno modifikovan profil: ', 'U redu', { duration: 2500 });
    window.location.href = this.rout.url;
  }
  public updatePassword(): void {
      if (this.newPassword.length > 7) {
        if (this.newPassword == this.repeatNewPassword) {
          this.lekar.user.password = this.newPassword;
          this.service.updateUser(this.lekar.user);
        this.authService.login(this.lekar.user.username, this.newPassword);
          this.snackBar.open('Uspešno modifikovana lozinka. ', 'U redu', { duration: 10000 });
          window.location.href = this.rout.url;
        } else {
          this.snackBar.open('Lozinke se ne poklapaju.', 'U redu', { duration: 10000 });
        }
      } else {
        this.snackBar.open('Nova lozinka mora da ima barem 8 karaktera.', 'U redu', { duration: 10000 });
      }
    
  }
  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste!', 'U redu', { duration: 1000 });
  }
}
