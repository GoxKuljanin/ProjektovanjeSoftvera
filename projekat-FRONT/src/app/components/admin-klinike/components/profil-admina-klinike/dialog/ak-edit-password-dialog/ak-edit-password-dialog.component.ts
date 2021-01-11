import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdminKlinikeService } from 'src/app/services/admin-klinike.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-ak-edit-password-dialog',
  templateUrl: './ak-edit-password-dialog.component.html',
  styleUrls: ['./ak-edit-password-dialog.component.css']
})
export class AkEditPasswordDialogComponent implements OnInit {
  user: User;
  newPassword: string;
  repeatNewPassword: string;
  constructor(public snackBar: MatSnackBar, private authService: AuthService,
    public dialogRef: MatDialogRef<AkEditPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    public adminKlinikeService: AdminKlinikeService, private rout: Router) {
    this.adminKlinikeService.getUserById(this.data.id).subscribe(
      data => {
        this.user = data;
      }
    );
  }

  ngOnInit() {
  }
  public update(): void {
    console.log(this.user.password);
      if (this.newPassword.length > 7) {
        if (this.newPassword == this.repeatNewPassword) {
          this.user.password = this.newPassword;
          
          this.adminKlinikeService.updateUser(this.user);
          this.authService.login(this.user.username, this.user.password);
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
    this.snackBar.open('Odustali ste!', 'U redu', { duration: 10000 });
  }

}
