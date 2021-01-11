import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-klinika-rating',
  templateUrl: './klinika-rating.component.html',
  styleUrls: ['./klinika-rating.component.css']
})
export class KlinikaRatingComponent implements OnInit {

  @Input() ocenaKlinika: number;
  @Input() klinikaId: number;
  @Output() odabranaOcena: EventEmitter<any> = new EventEmitter<any>();

  klinikaName: string;

  constructor() {}

  ngOnInit() {
    this.klinikaName = this.klinikaId + '_ocenaKlinika' + Math.random().toString();
  }
  onClick(ocena: number): void{
    console.log('Dogadjaj1!');
    this.ocenaKlinika = ocena;
    this.odabranaOcena.emit(
      {
        klinikaId: this.klinikaId,
        ocenaKlinika: ocena
      }
    );
  }
}
