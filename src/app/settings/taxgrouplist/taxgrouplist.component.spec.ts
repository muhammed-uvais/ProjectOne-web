import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxgrouplistComponent } from './taxgrouplist.component';

describe('TaxgrouplistComponent', () => {
  let component: TaxgrouplistComponent;
  let fixture: ComponentFixture<TaxgrouplistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxgrouplistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxgrouplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
