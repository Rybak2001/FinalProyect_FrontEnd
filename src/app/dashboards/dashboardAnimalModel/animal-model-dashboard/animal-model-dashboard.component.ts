import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { AnimalModel, AnimalModelDTO } from '../../../models/animal-model.model';
import { AnimalModelService } from '../../../services/animal-model.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animalmodel-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './animal-model-dashboard.component.html',
  styleUrls: ['./animal-model-dashboard.component.css']
})
export class AnimalModelDashboardComponent implements OnInit {
  private animalModelsSubject = new BehaviorSubject<AnimalModel[]>([]);
  animalModels$ = this.animalModelsSubject.asObservable();
  selectedAnimalModel$!: Observable<AnimalModel>;
  animalModelForm: FormGroup;
  selectedAnimalModelId: string | null = null;
  errorMessage: string = '';
  selectedFile: File | null = null;  // Variable para almacenar el archivo seleccionado

  constructor(private animalModelService: AnimalModelService, private fb: FormBuilder) {
    this.animalModelForm = this.fb.group({
      model_name: ['', Validators.required],
      thumbnail_url: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadAnimalModels();
  }

  loadAnimalModels(): void {
    this.animalModelService.getAnimalModels().subscribe((animalModels: AnimalModel[]) => {
      this.animalModelsSubject.next(animalModels);
    });
  }

  // Método para manejar la selección de archivos
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  createAnimalModel(): void {
    if (this.animalModelForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('model_name', this.animalModelForm.value.model_name);
      formData.append('description', this.animalModelForm.value.description);
      formData.append('thumbnail_url', this.animalModelForm.value.thumbnail_url);
      formData.append('modelFile', this.selectedFile);  // Añadimos el archivo seleccionado

      this.animalModelService.createAnimalModel(formData).subscribe({
        next: (createdAnimalModel: AnimalModel) => {
          console.log('AnimalModel created:', createdAnimalModel);
          this.loadAnimalModels();
          this.animalModelForm.reset();
          this.errorMessage = '';
        },
        error: (error) => {
          console.error('Error creating AnimalModel:', error);
          this.errorMessage = 'Error creating AnimalModel';
        }
      });
    }
  }

  updateAnimalModel(): void {
    if (this.animalModelForm.valid && this.selectedAnimalModelId) {
      const formData = new FormData();
      formData.append('model_name', this.animalModelForm.value.model_name);
      formData.append('description', this.animalModelForm.value.description);
      formData.append('thumbnail_url', this.animalModelForm.value.thumbnail_url);
      if (this.selectedFile) {
        formData.append('modelFile', this.selectedFile);  // Añadimos el archivo solo si ha sido seleccionado
      }

      this.animalModelService.updateAnimalModel(this.selectedAnimalModelId, formData).subscribe({
        next: (result: AnimalModel) => {
          console.log('AnimalModel updated:', result);
          this.loadAnimalModels();
          this.selectedAnimalModelId = null;
          this.animalModelForm.reset();
          this.errorMessage = '';
        },
        error: (error: any) => {
          console.error('Error updating AnimalModel:', error);
          this.errorMessage = 'Error updating AnimalModel';
        }
      });
    }
  }

  selectAnimalModel(animalModelId: string): void {
    this.selectedAnimalModelId = animalModelId;
    this.selectedAnimalModel$ = this.animalModelService.getAnimalModel(animalModelId);
    this.selectedAnimalModel$.subscribe(animalModel => {
      this.animalModelForm.patchValue({
        model_name: animalModel.model_name,
        thumbnail_url: animalModel.thumbnail_url,
        description: animalModel.description,
      });
    });
  }

  deleteAnimalModel(animalModelId: string): void {
    this.animalModelService.deleteAnimalModel(animalModelId).subscribe({
      next: () => {
        console.log('AnimalModel deleted');
        this.loadAnimalModels();
        if (this.selectedAnimalModelId === animalModelId) {
          this.selectedAnimalModelId = null;
          this.animalModelForm.reset();
        }
        this.errorMessage = '';
      },
      error: (error: any) => {
        console.error('Error deleting AnimalModel:', error);
        this.errorMessage = 'Error deleting AnimalModel';
      }
    });
  }
}
