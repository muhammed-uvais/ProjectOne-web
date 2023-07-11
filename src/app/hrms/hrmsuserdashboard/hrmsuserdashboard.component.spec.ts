import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmsuserdashboardComponent } from './hrmsuserdashboard.component';

describe('HrmsuserdashboardComponent', () => {
  let component: HrmsuserdashboardComponent;
  let fixture: ComponentFixture<HrmsuserdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrmsuserdashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrmsuserdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
