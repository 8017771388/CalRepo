import { TestBed } from '@angular/core/testing';

import { AssumptionTableRowsService } from './assumption-table-rows.service';

describe('AssumptionTableRowsService', () => {
  let service: AssumptionTableRowsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssumptionTableRowsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
