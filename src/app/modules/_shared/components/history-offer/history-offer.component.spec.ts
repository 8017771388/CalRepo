import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOfferComponent } from './history-offer.component';

describe('HistoryOfferComponent', () => {
  let component: HistoryOfferComponent;
  let fixture: ComponentFixture<HistoryOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
