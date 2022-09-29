import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationsliderComponent } from './configurationslider.component';

describe('ConfigurationsliderComponent', () => {
  let component: ConfigurationsliderComponent;
  let fixture: ComponentFixture<ConfigurationsliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationsliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationsliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
