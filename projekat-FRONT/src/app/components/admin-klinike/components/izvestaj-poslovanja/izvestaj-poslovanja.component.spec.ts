import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IzvestajPoslovanjaComponent } from './izvestaj-poslovanja.component';

describe('IzvestajPoslovanjaComponent', () => {
  let component: IzvestajPoslovanjaComponent;
  let fixture: ComponentFixture<IzvestajPoslovanjaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IzvestajPoslovanjaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IzvestajPoslovanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
