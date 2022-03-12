import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UlozjakoComponent } from './ulozjako.component';

describe('UlozjakoComponent', () => {
  let component: UlozjakoComponent;
  let fixture: ComponentFixture<UlozjakoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UlozjakoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UlozjakoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
