import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamosCustomerComponent } from './reclamos-customer.component';

describe('ReclamosCustomerComponent', () => {
  let component: ReclamosCustomerComponent;
  let fixture: ComponentFixture<ReclamosCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamosCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamosCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
