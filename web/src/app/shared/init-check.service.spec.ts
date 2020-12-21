import { TestBed } from '@angular/core/testing';

import { InitCheckService } from './init-check.service';

describe('InitCheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InitCheckService = TestBed.get(InitCheckService);
    expect(service).toBeTruthy();
  });
});
