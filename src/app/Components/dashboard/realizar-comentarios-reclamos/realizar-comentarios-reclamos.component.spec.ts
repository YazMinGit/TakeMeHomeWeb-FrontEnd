import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarComentariosReclamosComponent } from './realizar-comentarios-reclamos.component';

describe('RealizarComentariosReclamosComponent', () => {
  let component: RealizarComentariosReclamosComponent;
  let fixture: ComponentFixture<RealizarComentariosReclamosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealizarComentariosReclamosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealizarComentariosReclamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
