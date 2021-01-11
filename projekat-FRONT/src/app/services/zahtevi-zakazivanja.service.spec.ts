import { TestBed } from '@angular/core/testing';

import { ZahteviZakazivanjaService } from './zahtevi-zakazivanja.service';

describe('ZahteviZakazivanjaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ZahteviZakazivanjaService = TestBed.get(ZahteviZakazivanjaService);
    expect(service).toBeTruthy();
  });
});
