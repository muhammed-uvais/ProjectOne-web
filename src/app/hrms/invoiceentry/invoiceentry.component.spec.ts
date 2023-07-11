import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceentryComponent } from './invoiceentry.component';

describe('InvoiceentryComponent', () => {
  let component: InvoiceentryComponent;
  let fixture: ComponentFixture<InvoiceentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceentryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
