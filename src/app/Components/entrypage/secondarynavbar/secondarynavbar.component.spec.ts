import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondarynavbarComponent } from './secondarynavbar.component';

describe('SecondarynavbarComponent', () => {
  let component: SecondarynavbarComponent;
  let fixture: ComponentFixture<SecondarynavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondarynavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondarynavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
