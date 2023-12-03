import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportListingComponent } from './report-listing.component';

describe('ReportListingComponent', () => {
  let component: ReportListingComponent;
  let fixture: ComponentFixture<ReportListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
