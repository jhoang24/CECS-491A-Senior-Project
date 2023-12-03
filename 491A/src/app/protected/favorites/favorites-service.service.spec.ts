import { TestBed } from '@angular/core/testing';

import { FavoritesServiceService } from './favorites-service.service';

describe('FavoritesServiceService', () => {
  let service: FavoritesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
