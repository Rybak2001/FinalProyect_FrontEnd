import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AnimalModel } from '../models/animal-model.model';

@Injectable({
  providedIn: 'root'
})
export class AnimalModelService {
  private apiUrl = 'https://node-server-lilac-seven.vercel.app/api/animalmodels';

  constructor(private http: HttpClient) {}

  // Crear un AnimalModel
  createAnimalModel(animalModel: FormData): Observable<AnimalModel> {
    console.log(animalModel)
    return this.http.post<AnimalModel>(this.apiUrl, animalModel)
      .pipe(catchError(this.handleError<AnimalModel>('createAnimalModel')));
  }

  updateAnimalModel(id: string, animalModel: FormData): Observable<AnimalModel> {
    return this.http.put<AnimalModel>(`${this.apiUrl}/${id}`, animalModel)
      .pipe(catchError(this.handleError<AnimalModel>('updateAnimalModel')));
  }

  // Obtener todos los AnimalModels
  getAnimalModels(): Observable<AnimalModel[]> {
    return this.http.get<AnimalModel[]>(this.apiUrl)
      .pipe(catchError(this.handleError<AnimalModel[]>('getAnimalModels', [])));
  }

  // Obtener un AnimalModel por ID
  getAnimalModel(id: string): Observable<AnimalModel> {
    return this.http.get<AnimalModel>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError<AnimalModel>('getAnimalModel')));
  }

  // Eliminar un AnimalModel
  deleteAnimalModel(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError<void>('deleteAnimalModel')));
  }

  // Manejar errores de la API
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      // Devuelve un observable del valor por defecto que pasamos en `result`
      return of(result as T);
    };
  }
}
