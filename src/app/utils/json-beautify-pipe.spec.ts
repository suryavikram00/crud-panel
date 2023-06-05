import { TestBed } from '@angular/core/testing';

import { JsonBeautifyPipeService } from './json-beautify-pipe';

describe('JsonBeautifyPipeService', () => {
  let service: JsonBeautifyPipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonBeautifyPipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
