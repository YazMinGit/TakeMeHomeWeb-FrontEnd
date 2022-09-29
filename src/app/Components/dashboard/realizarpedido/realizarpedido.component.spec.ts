import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarpedidoComponent } from './realizarpedido.component';

describe('RealizarpedidoComponent', () => {
  let component: RealizarpedidoComponent;
  let fixture: ComponentFixture<RealizarpedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealizarpedidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealizarpedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
