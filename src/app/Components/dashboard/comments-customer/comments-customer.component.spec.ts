import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsCustomerComponent } from './comments-customer.component';

describe('CommentsCustomerComponent', () => {
  let component: CommentsCustomerComponent;
  let fixture: ComponentFixture<CommentsCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentsCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
