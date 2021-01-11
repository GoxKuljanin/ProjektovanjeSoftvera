import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lekar-rating',
  templateUrl: './lekar-rating.component.html',
  styleUrls: ['./lekar-rating.component.css']
})
export class LekarRatingComponent implements OnInit {

  @Input() ocena: number;
  @Input() lekarId: number;
  @Output() odabranaOcena: EventEmitter<any> = new EventEmitter<any>();

  inputName: string;

  constructor() { }

  ngOnInit() {
    this.inputName = this.lekarId + '_ocena' + Math.random().toString();
  }

  onClick(ocena: number): void{
    console.log('Dogadjaj1!');
    this.ocena = ocena;
    this.odabranaOcena.emit(
      {
        lekarId: this.lekarId,
        ocena: ocena
      }
    );
  }

}
