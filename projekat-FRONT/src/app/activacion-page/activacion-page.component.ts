import { AdminKlinickogCentraService } from './../services/adminKCServices/admin-klinickog-centra.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activacion-page',
  templateUrl: './activacion-page.component.html',
  styleUrls: ['./activacion-page.component.css']
})
export class ActivacionPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private adminService: AdminKlinickogCentraService) { }

  ngOnInit() {
    let idSelektovanog = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(idSelektovanog);

    this.adminService.aktivirajNalog(idSelektovanog).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log('Ne moze se aktivirati!');
      }
    );

  }

}
