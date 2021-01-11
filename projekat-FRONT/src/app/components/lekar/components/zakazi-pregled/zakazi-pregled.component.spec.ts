import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZakaziPregledComponent } from './zakazi-pregled.component';

describe('ZakaziPregledComponent', () => {
  let component: ZakaziPregledComponent;
  let fixture: ComponentFixture<ZakaziPregledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZakaziPregledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZakaziPregledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
