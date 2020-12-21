import { TestBed } from '@angular/core/testing';

import { StartupCheckService } from './startup-check.service';

describe('StartupCheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StartupCheckService = TestBed.get(StartupCheckService);
    expect(service).toBeTruthy();
  });
});
