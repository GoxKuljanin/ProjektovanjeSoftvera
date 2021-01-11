import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OceneLekariKlinikeComponent } from './ocene-lekari-klinike.component';

describe('OceneLekariKlinikeComponent', () => {
  let component: OceneLekariKlinikeComponent;
  let fixture: ComponentFixture<OceneLekariKlinikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OceneLekariKlinikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OceneLekariKlinikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
