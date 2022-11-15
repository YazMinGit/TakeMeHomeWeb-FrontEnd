import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialCourrierComponent } from './historial-courrier.component';

describe('HistorialCourrierComponent', () => {
  let component: HistorialCourrierComponent;
  let fixture: ComponentFixture<HistorialCourrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialCourrierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialCourrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
