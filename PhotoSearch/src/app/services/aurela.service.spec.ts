import { TestBed } from '@angular/core/testing';

import { AurelaService } from './aurela.service';

describe('AurelaService', () => {
  let service: AurelaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AurelaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
