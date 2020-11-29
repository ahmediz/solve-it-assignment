import { TestBed } from '@angular/core/testing';

import { PostDetailsResolver } from './post-details.resolver';

describe('PostDetailsResolver', () => {
  let resolver: PostDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PostDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
