/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EvolucionPreciosComponent } from './evolucion-precios.component';

describe('EvolucionPreciosComponent', () => {
  let component: EvolucionPreciosComponent;
  let fixture: ComponentFixture<EvolucionPreciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvolucionPreciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvolucionPreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
