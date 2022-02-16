import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpvProfitLossComponent } from './npv-profit-loss.component';

describe('NpvProfitLossComponent', () => {
  let component: NpvProfitLossComponent;
  let fixture: ComponentFixture<NpvProfitLossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NpvProfitLossComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NpvProfitLossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
