import { TestBed } from '@angular/core/testing';

import { TaxgroupService } from './taxgroup.service';

describe('TaxgroupService', () => {
  let service: TaxgroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxgroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
