import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingComponent } from './selling.component';

describe('SellingComponent', () => {
  let component: SellingComponent;
  let fixture: ComponentFixture<SellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
