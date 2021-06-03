import { TestBed } from '@angular/core/testing';

import { ServicioCatalogoProductoService } from './servicio-catalogo-producto.service';

describe('ServicioCatalogoProductoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicioCatalogoProductoService = TestBed.get(ServicioCatalogoProductoService);
    expect(service).toBeTruthy();
  });
});
