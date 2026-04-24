import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaChica } from './caja-chica';

describe('CajaChica', () => {
  let component: CajaChica;
  let fixture: ComponentFixture<CajaChica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CajaChica]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CajaChica);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
