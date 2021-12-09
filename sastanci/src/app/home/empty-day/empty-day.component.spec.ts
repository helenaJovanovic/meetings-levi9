import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyDayComponent } from './empty-day.component';

describe('EmptyDayComponent', () => {
  let component: EmptyDayComponent;
  let fixture: ComponentFixture<EmptyDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
