import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInteractionDashboardComponent } from './user-interaction-dashboard.component';

describe('UserInteractionDashboardComponent', () => {
  let component: UserInteractionDashboardComponent;
  let fixture: ComponentFixture<UserInteractionDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInteractionDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInteractionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
