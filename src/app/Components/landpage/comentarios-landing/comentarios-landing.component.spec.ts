import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariosLandingComponent } from './comentarios-landing.component';

describe('ComentariosLandingComponent', () => {
  let component: ComentariosLandingComponent;
  let fixture: ComponentFixture<ComentariosLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComentariosLandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComentariosLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
