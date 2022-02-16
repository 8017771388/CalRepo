import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferErrorModalComponent } from './offer-error-modal.component';

describe('OfferErrorModalComponent', () => {
  let component: OfferErrorModalComponent;
  let fixture: ComponentFixture<OfferErrorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferErrorModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferErrorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
