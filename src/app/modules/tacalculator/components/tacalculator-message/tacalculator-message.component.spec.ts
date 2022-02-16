import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacalculatorMessageComponent } from './tacalculator-message.component';

describe('TacalculatorMessageComponent', () => {
  let component: TacalculatorMessageComponent;
  let fixture: ComponentFixture<TacalculatorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TacalculatorMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TacalculatorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
