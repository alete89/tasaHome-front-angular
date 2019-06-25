/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SitioPublicacionService } from './sitio_publicacion.service';

describe('Service: Sitio_publicacion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SitioPublicacionService]
    });
  });

  it('should ...', inject([SitioPublicacionService], (service: SitioPublicacionService) => {
    expect(service).toBeTruthy();
  }));
});
