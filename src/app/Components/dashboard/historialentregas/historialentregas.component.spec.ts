import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialentregasComponent } from './historialentregas.component';

describe('HistorialentregasComponent', () => {
  let component: HistorialentregasComponent;
  let fixture: ComponentFixture<HistorialentregasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialentregasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialentregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
