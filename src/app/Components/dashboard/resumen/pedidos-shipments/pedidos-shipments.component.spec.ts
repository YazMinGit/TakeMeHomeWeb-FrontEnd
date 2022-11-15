import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosShipmentsComponent } from './pedidos-shipments.component';

describe('PedidosShipmentsComponent', () => {
  let component: PedidosShipmentsComponent;
  let fixture: ComponentFixture<PedidosShipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosShipmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidosShipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
