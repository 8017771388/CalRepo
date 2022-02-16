import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpvModalComponent } from './npv-modal.component';

describe('NpvModalComponent', () => {
  let component: NpvModalComponent;
  let fixture: ComponentFixture<NpvModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NpvModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NpvModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
