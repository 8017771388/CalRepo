import { TestBed } from '@angular/core/testing';

import { TacalculatorService } from './tacalculator.service';

describe('TacalculatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TacalculatorService = TestBed.get(TacalculatorService);
    expect(service).toBeTruthy();
  });
});
