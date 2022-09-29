import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarviajeComponent } from './realizarviaje.component';

describe('RealizarviajeComponent', () => {
  let component: RealizarviajeComponent;
  let fixture: ComponentFixture<RealizarviajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealizarviajeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealizarviajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
