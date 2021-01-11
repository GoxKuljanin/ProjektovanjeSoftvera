import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZahteviZakazivanjaPregledaComponent } from './zahtevi-zakazivanja-pregleda.component';

describe('ZahteviZakazivanjaPregledaComponent', () => {
  let component: ZahteviZakazivanjaPregledaComponent;
  let fixture: ComponentFixture<ZahteviZakazivanjaPregledaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZahteviZakazivanjaPregledaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZahteviZakazivanjaPregledaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
