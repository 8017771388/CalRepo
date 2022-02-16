import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TacalculatorInputFormComponent } from './tacalculator-input-form.component';

describe('TacalculatorInputFormComponent', () => {
  let component: TacalculatorInputFormComponent;
  let fixture: ComponentFixture<TacalculatorInputFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TacalculatorInputFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TacalculatorInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
