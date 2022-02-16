import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssumptionTableComponent } from './add-assumption-table.component';

describe('AddAssumptionTableComponent', () => {
  let component: AddAssumptionTableComponent;
  let fixture: ComponentFixture<AddAssumptionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAssumptionTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssumptionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
