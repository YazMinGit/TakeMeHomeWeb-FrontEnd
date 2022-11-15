import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarViajeComponent } from './realizar-viaje.component';

describe('RealizarViajeComponent', () => {
  let component: RealizarViajeComponent;
  let fixture: ComponentFixture<RealizarViajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealizarViajeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealizarViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
