import { TestBed } from '@angular/core/testing';

import { SafeHtmlPipeService } from './safe-html-pipe';

describe('SafeHtmlPipeService', () => {
  let service: SafeHtmlPipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SafeHtmlPipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
