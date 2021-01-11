import { TestBed } from '@angular/core/testing';

import { PacijentService } from './pacijent.service';

describe('PacijentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PacijentService = TestBed.get(PacijentService);
    expect(service).toBeTruthy();
  });
});
