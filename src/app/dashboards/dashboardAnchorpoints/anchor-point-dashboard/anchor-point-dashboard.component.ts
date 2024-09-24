import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { AnchorPoint } from '../../../models/anchor-point.model';
import { AnchorPointService } from '../../../services/anchor-point.service';
import { AnimalModelService } from '../../../services/animal-model.service'; // Importa el servicio de AnimalModel
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-anchorpoint-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './anchor-point-dashboard.component.html',
  styleUrls: ['./anchor-point-dashboard.component.css']
})
export class AnchorPointDashboardComponent implements OnInit {
  private anchorPointsSubject = new BehaviorSubject<AnchorPoint[]>([]);
  anchorPoints$ = this.anchorPointsSubject.asObservable();
  selectedAnchorPoint$!: Observable<AnchorPoint>;
  anchorPointForm: FormGroup;
  selectedAnchorPointId: string | null = null;
  errorMessage: string = '';
  animalModelUrls: string[] = []; // Variable para almacenar los model_urls

  constructor(
    private anchorPointService: AnchorPointService,
    private animalModelService: AnimalModelService, // Inyecta el servicio de AnimalModel
    private fb: FormBuilder
  ) {
    this.anchorPointForm = this.fb.group({
      spatial_data: ['', Validators.required],
      metadata: ['', Validators.required],
      user_data: ['', Validators.required],
      animal_model_url: ['', Validators.required], // Este campo será un select
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadAnchorPoints();
    this.loadAnimalModelUrls(); // Carga los model_urls al iniciar
  }

  loadAnchorPoints(): void {
    this.anchorPointService.getAnchorPoints().subscribe((anchorPoints: AnchorPoint[]) => {
      this.anchorPointsSubject.next(anchorPoints);
    });
  }

  loadAnimalModelUrls(): void {
    this.animalModelService.getAnimalModels().subscribe((animalModels) => {
      this.animalModelUrls = animalModels.map(model => model.model_url); // Extrae los model_urls
    });
  }

  createAnchorPoint(): void {
    if (this.anchorPointForm.valid) {
      const newAnchorPoint = new AnchorPoint(
        '', // Deja vacío para que el backend asigne el ID automáticamente
        this.anchorPointForm.value.spatial_data,
        this.anchorPointForm.value.metadata,
        this.anchorPointForm.value.user_data,
        this.anchorPointForm.value.animal_model_url,
        this.anchorPointForm.value.description,
        new Date(),
        new Date()
      );

      this.anchorPointService.createAnchorPoint(newAnchorPoint).subscribe({
        next: (createdAnchorPoint: AnchorPoint) => {
          console.log('AnchorPoint created:', createdAnchorPoint);
          this.loadAnchorPoints();
          this.anchorPointForm.reset();
          this.errorMessage = '';
        },
        error: (error: any) => {
          console.error('Error creating AnchorPoint:', error);
          this.errorMessage = 'Error creating AnchorPoint';
        }
      });
    }
  }

  selectAnchorPoint(anchorPointId: string): void {
    this.selectedAnchorPointId = anchorPointId;
    this.selectedAnchorPoint$ = this.anchorPointService.getAnchorPoint(anchorPointId);
    this.selectedAnchorPoint$.subscribe(anchorPoint => {
      this.anchorPointForm.patchValue({
        spatial_data: anchorPoint.spatial_data,
        metadata: anchorPoint.metadata,
        user_data: anchorPoint.user_data,
        animal_model_url: anchorPoint.animal_model_url,
        description: anchorPoint.description,
      });
    });
  }

  updateAnchorPoint(): void {
    if (this.anchorPointForm.valid && this.selectedAnchorPointId) {
      const updatedAnchorPoint = new AnchorPoint(
        this.selectedAnchorPointId,
        this.anchorPointForm.value.spatial_data,
        this.anchorPointForm.value.metadata,
        this.anchorPointForm.value.user_data,
        this.anchorPointForm.value.animal_model_url,
        this.anchorPointForm.value.description,
        new Date(),
        new Date()
      );

      this.anchorPointService.updateAnchorPoint(this.selectedAnchorPointId, updatedAnchorPoint).subscribe({
        next: (result: AnchorPoint) => {
          console.log('AnchorPoint updated:', result);
          this.loadAnchorPoints();
          this.selectedAnchorPointId = null;
          this.anchorPointForm.reset();
          this.errorMessage = '';
        },
        error: (error: any) => {
          console.error('Error updating AnchorPoint:', error);
          this.errorMessage = 'Error updating AnchorPoint';
        }
      });
    }
  }

  deleteAnchorPoint(anchorPointId: string): void {
    this.anchorPointService.deleteAnchorPoint(anchorPointId).subscribe({
      next: () => {
        console.log('AnchorPoint deleted');
        this.loadAnchorPoints();
        if (this.selectedAnchorPointId === anchorPointId) {
          this.selectedAnchorPointId = null;
          this.anchorPointForm.reset();
        }
        this.errorMessage = '';
      },
      error: (error: any) => {
        console.error('Error deleting AnchorPoint:', error);
        this.errorMessage = 'Error deleting AnchorPoint';
      }
    });
  }
}
