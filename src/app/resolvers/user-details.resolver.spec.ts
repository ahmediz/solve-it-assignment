import { TestBed } from '@angular/core/testing';

import { UserDetailsResolver } from './user-details.resolver';

describe('UserDetailsResolver', () => {
  let resolver: UserDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UserDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
