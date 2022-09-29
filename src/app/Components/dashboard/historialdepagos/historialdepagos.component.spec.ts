import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialdepagosComponent } from './historialdepagos.component';

describe('HistorialdepagosComponent', () => {
  let component: HistorialdepagosComponent;
  let fixture: ComponentFixture<HistorialdepagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialdepagosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialdepagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
