/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ZonaService } from './zona.service';

describe('Service: Zona', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZonaService]
    });
  });

  it('should ...', inject([ZonaService], (service: ZonaService) => {
    expect(service).toBeTruthy();
  }));
});
