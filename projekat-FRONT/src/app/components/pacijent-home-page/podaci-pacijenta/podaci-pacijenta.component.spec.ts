import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodaciPacijentaComponent } from './podaci-pacijenta.component';

describe('PodaciPacijentaComponent', () => {
  let component: PodaciPacijentaComponent;
  let fixture: ComponentFixture<PodaciPacijentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodaciPacijentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodaciPacijentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
