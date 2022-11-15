import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregasPagadasComponent } from './entregas-pagadas.component';

describe('EntregasPagadasComponent', () => {
  let component: EntregasPagadasComponent;
  let fixture: ComponentFixture<EntregasPagadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntregasPagadasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntregasPagadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
