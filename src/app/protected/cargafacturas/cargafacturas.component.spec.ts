import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargafacturasComponent } from './cargafacturas.component';

describe('CargafacturasComponent', () => {
  let component: CargafacturasComponent;
  let fixture: ComponentFixture<CargafacturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargafacturasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargafacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
