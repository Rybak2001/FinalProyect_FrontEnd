import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnchorPointDashboardComponent } from './anchor-point-dashboard.component';

describe('AnchorPointDashboardComponent', () => {
  let component: AnchorPointDashboardComponent;
  let fixture: ComponentFixture<AnchorPointDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnchorPointDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnchorPointDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
