import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfCourrierComponent } from './pdf-courrier.component';

describe('PdfCourrierComponent', () => {
  let component: PdfCourrierComponent;
  let fixture: ComponentFixture<PdfCourrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfCourrierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfCourrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
