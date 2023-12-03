import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportUserComponent } from './report-user.component';

describe('ReportUserComponent', () => {
  let component: ReportUserComponent;
  let fixture: ComponentFixture<ReportUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
