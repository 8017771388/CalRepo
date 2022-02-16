import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpvDataComponent } from './npv-data.component';

describe('NpvDataComponent', () => {
  let component: NpvDataComponent;
  let fixture: ComponentFixture<NpvDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NpvDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NpvDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
