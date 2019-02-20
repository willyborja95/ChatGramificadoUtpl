import { TestBed } from '@angular/core/testing';

import { GlosarioService } from './glosario.service';

describe('GlosarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlosarioService = TestBed.get(GlosarioService);
    expect(service).toBeTruthy();
  });
});
