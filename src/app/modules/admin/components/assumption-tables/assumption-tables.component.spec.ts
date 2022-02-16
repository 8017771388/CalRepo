import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssumptionTablesComponent } from './assumption-tables.component';

describe('AssumptionTablesComponent', () => {
  let component: AssumptionTablesComponent;
  let fixture: ComponentFixture<AssumptionTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssumptionTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssumptionTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
