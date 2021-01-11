import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikazKlinikeComponent } from './prikaz-klinike.component';

describe('PrikazKlinikeComponent', () => {
  let component: PrikazKlinikeComponent;
  let fixture: ComponentFixture<PrikazKlinikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrikazKlinikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrikazKlinikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
