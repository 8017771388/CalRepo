import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicAssumptionsTableComponent } from './dynamic-assumptions-table.component';

describe('DynamicAssumptionsTableComponent', () => {
  let component: DynamicAssumptionsTableComponent;
  let fixture: ComponentFixture<DynamicAssumptionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicAssumptionsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicAssumptionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
