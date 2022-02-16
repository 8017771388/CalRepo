import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssumptionTableComponent } from './assumption-table.component';

describe('AssumptionTableComponent', () => {
  let component: AssumptionTableComponent;
  let fixture: ComponentFixture<AssumptionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssumptionTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssumptionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
