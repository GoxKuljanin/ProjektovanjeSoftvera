import { AdminKlinickogCentraService } from './../../../services/adminKCServices/admin-klinickog-centra.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-odbij-zahtev-dialog',
  templateUrl: './odbij-zahtev-dialog.component.html',
  styleUrls: ['./odbij-zahtev-dialog.component.css']
})
export class OdbijZahtevDialogComponent implements OnInit {

  poruka: string;

  constructor(public dialogRef: MatDialogRef<OdbijZahtevDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              public snackBar: MatSnackBar, private service: AdminKlinickogCentraService) { }

  ngOnInit() {
  }

  posalji(){
    if(this.poruka == "" || this.poruka == undefined){
      this.snackBar.open('Morate uneti sva polja!', 'U redu', { duration: 10000 });
    }else {
      console.log(this.data.username);
      this.service.odbijZahtev(this.data.username, this.poruka).subscribe();
    }
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste!', 'U redu', { duration: 1000 });
  }
}
