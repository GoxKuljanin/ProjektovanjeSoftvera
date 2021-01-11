import { TestBed } from '@angular/core/testing';

import { AdminKlinickogCentraService } from './admin-klinickog-centra.service';

describe('AdminKlinickogCentraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminKlinickogCentraService = TestBed.get(AdminKlinickogCentraService);
    expect(service).toBeTruthy();
  });
});
