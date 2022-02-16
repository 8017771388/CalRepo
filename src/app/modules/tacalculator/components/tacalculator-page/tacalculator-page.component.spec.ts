import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TacalculatorPageComponent } from './tacalculator-page.component';

describe('TacalculatorPageComponent', () => {
  let component: TacalculatorPageComponent;
  let fixture: ComponentFixture<TacalculatorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TacalculatorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TacalculatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
