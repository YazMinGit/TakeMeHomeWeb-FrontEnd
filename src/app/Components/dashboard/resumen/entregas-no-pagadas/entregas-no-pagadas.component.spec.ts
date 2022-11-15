import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregasNoPagadasComponent } from './entregas-no-pagadas.component';

describe('EntregasNoPagadasComponent', () => {
  let component: EntregasNoPagadasComponent;
  let fixture: ComponentFixture<EntregasNoPagadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntregasNoPagadasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntregasNoPagadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
