import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPregledaComponent } from './lista-pregleda.component';

describe('ListaPregledaComponent', () => {
  let component: ListaPregledaComponent;
  let fixture: ComponentFixture<ListaPregledaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPregledaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPregledaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
