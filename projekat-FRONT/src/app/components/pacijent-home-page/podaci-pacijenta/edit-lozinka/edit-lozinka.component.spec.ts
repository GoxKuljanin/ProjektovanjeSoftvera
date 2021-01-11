import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLozinkaComponent } from './edit-lozinka.component';

describe('EditLozinkaComponent', () => {
  let component: EditLozinkaComponent;
  let fixture: ComponentFixture<EditLozinkaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLozinkaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLozinkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
