import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZakazaniPreglediComponent } from './zakazani-pregledi.component';

describe('ZakazaniPreglediComponent', () => {
  let component: ZakazaniPreglediComponent;
  let fixture: ComponentFixture<ZakazaniPreglediComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZakazaniPreglediComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZakazaniPreglediComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
