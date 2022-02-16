import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportOfferComponent } from './export-offer.component';

describe('ExportOfferComponent', () => {
  let component: ExportOfferComponent;
  let fixture: ComponentFixture<ExportOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
