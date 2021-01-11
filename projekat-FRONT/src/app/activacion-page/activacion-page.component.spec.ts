import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivacionPageComponent } from './activacion-page.component';

describe('ActivacionPageComponent', () => {
  let component: ActivacionPageComponent;
  let fixture: ComponentFixture<ActivacionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivacionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivacionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
