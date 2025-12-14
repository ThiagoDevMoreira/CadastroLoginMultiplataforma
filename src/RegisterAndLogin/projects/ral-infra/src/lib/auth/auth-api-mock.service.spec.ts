import { TestBed } from '@angular/core/testing';

import { AuthApiMockService } from './auth-api-mock.service';

describe('AuthApiMock', () => {
  let service: AuthApiMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthApiMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
