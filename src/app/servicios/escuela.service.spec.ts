/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EscuelaService } from './escuela.service';

describe('Service: Escuela', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EscuelaService]
    });
  });

  it('should ...', inject([EscuelaService], (service: EscuelaService) => {
    expect(service).toBeTruthy();
  }));
});
