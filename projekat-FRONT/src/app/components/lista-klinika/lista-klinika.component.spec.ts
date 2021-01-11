import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaKlinikaComponent } from './lista-klinika.component';

describe('ListaKlinikaComponent', () => {
  let component: ListaKlinikaComponent;
  let fixture: ComponentFixture<ListaKlinikaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaKlinikaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaKlinikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
