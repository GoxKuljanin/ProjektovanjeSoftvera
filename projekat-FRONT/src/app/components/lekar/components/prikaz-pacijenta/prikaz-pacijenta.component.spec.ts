import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikazPacijentaComponent } from './prikaz-pacijenta.component';

describe('PrikazPacijentaComponent', () => {
  let component: PrikazPacijentaComponent;
  let fixture: ComponentFixture<PrikazPacijentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrikazPacijentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrikazPacijentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
