import { TestBed } from '@angular/core/testing';

import { IndexeddbStoreService } from './indexeddb-store.service';

describe('IndexdbStore', () => {
  let service: IndexeddbStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexeddbStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
