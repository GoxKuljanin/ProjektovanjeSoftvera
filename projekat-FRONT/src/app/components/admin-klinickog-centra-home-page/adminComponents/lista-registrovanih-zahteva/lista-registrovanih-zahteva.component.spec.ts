import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRegistrovanihZahtevaComponent } from './lista-registrovanih-zahteva.component';

describe('ListaRegistrovanihZahtevaComponent', () => {
  let component: ListaRegistrovanihZahtevaComponent;
  let fixture: ComponentFixture<ListaRegistrovanihZahtevaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaRegistrovanihZahtevaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRegistrovanihZahtevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
