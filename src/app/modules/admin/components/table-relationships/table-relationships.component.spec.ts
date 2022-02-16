import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRelationshipsComponent } from './table-relationships.component';

describe('TableRelationshipsComponent', () => {
  let component: TableRelationshipsComponent;
  let fixture: ComponentFixture<TableRelationshipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableRelationshipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRelationshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
