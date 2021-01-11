import { TestBed } from '@angular/core/testing';

import { AdminKlinikeService } from './admin-klinike.service';

describe('AdminKlinikeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminKlinikeService = TestBed.get(AdminKlinikeService);
    expect(service).toBeTruthy();
  });
});
