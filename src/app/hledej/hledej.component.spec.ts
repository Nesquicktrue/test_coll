import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HledejComponent } from './hledej.component';

describe('HledejComponent', () => {
  let component: HledejComponent;
  let fixture: ComponentFixture<HledejComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HledejComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HledejComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
