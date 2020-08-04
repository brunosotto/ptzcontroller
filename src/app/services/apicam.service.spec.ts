import { TestBed } from '@angular/core/testing';

import { ApicamService } from './apicam.service';

describe('ApicamService', () => {
  let service: ApicamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApicamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
