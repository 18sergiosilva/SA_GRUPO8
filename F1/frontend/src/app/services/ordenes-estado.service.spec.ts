import { TestBed } from '@angular/core/testing';

import { OrdenesEstadoService } from './ordenes-estado.service';

describe('OrdenesEstadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdenesEstadoService = TestBed.get(OrdenesEstadoService);
    expect(service).toBeTruthy();
  });
});
