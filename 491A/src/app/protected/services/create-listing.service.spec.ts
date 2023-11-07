import { TestBed } from '@angular/core/testing';

import { createListingService } from './create-listing.service';

describe('createListingService', () => {
  let service: createListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(createListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


