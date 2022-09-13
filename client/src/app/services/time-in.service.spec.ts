import { TestBed } from '@angular/core/testing';

import { TimeInService } from './time-in.service';

describe('TimeInService', () => {
  let service: TimeInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
