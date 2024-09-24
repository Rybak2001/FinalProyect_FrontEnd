import { TestBed } from '@angular/core/testing';

import { AnchorPointService } from './anchor-point.service';

describe('AnchorPointService', () => {
  let service: AnchorPointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnchorPointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
