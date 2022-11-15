import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosPagadosComponent } from './pedidos-pagados.component';

describe('PedidosPagadosComponent', () => {
  let component: PedidosPagadosComponent;
  let fixture: ComponentFixture<PedidosPagadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosPagadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidosPagadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
