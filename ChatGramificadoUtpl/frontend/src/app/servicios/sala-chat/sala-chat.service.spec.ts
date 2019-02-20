import { TestBed } from '@angular/core/testing';

import { SalaChatService } from './sala-chat.service';

describe('SalaChatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalaChatService = TestBed.get(SalaChatService);
    expect(service).toBeTruthy();
  });
});
