import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorscreenComponent } from './errorscreen.component';

describe('ErrorscreenComponent', () => {
  let component: ErrorscreenComponent;
  let fixture: ComponentFixture<ErrorscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorscreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
