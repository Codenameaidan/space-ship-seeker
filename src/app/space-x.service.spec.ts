import { TestBed } from '@angular/core/testing';

import { SpaceXService } from './space-x.service';

describe('SpaceXService', () => {
  let service: SpaceXService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpaceXService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
