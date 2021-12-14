import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SastanciComponent } from './sastanci.component';

describe('SastanciComponent', () => {
  let component: SastanciComponent;
  let fixture: ComponentFixture<SastanciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SastanciComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SastanciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
