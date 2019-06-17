/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TasacionService } from './tasacion.service';

describe('Service: Tasacion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TasacionService]
    });
  });

  it('should ...', inject([TasacionService], (service: TasacionService) => {
    expect(service).toBeTruthy();
  }));
});
