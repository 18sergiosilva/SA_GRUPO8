import { TestBed } from '@angular/core/testing';

import { ServicioCrearOrdenService } from './servicio-crear-orden.service';

describe('ServicioCrearOrdenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicioCrearOrdenService = TestBed.get(ServicioCrearOrdenService);
    expect(service).toBeTruthy();
  });
});
