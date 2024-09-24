import { TestBed } from '@angular/core/testing';

import { AnimalModelService } from './animal-model.service';

describe('AnimalModelService', () => {
  let service: AnimalModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
