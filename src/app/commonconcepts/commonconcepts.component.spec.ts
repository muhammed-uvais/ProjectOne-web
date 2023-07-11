import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonconceptsComponent } from './commonconcepts.component';

describe('CommonconceptsComponent', () => {
  let component: CommonconceptsComponent;
  let fixture: ComponentFixture<CommonconceptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonconceptsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonconceptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
