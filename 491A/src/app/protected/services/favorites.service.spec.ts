import { TestBed } from '@angular/core/testing';

import { FavoritesService } from "./favorites.service"

describe('FavoritesServiceService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
