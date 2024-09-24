import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalModelDashboardComponent } from './animal-model-dashboard.component';

describe('AnimalModelDashboardComponent', () => {
  let component: AnimalModelDashboardComponent;
  let fixture: ComponentFixture<AnimalModelDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalModelDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalModelDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
