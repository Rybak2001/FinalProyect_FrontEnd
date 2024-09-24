import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AnchorPoint } from '../models/anchor-point.model';

@Injectable({
  providedIn: 'root'
})
export class AnchorPointService {
  private apiUrl = 'https://node-server-lilac-seven.vercel.app/api/anchorpoints';

  constructor(private http: HttpClient) {}

  // Crear un AnchorPoint
  createAnchorPoint(anchorPoint: AnchorPoint): Observable<AnchorPoint> {
    const body = new URLSearchParams();
    body.set('spatial_data', JSON.stringify(anchorPoint.spatial_data)); // Convertir a JSON string
    body.set('metadata', JSON.stringify(anchorPoint.metadata)); // Convertir a JSON string
    body.set('user_data', JSON.stringify(anchorPoint.user_data)); // Convertir a JSON string
    body.set('animal_model_url', anchorPoint.animal_model_url);
    body.set('description', anchorPoint.description);
    body.set('created_at', anchorPoint.created_at.toISOString());
    body.set('updated_at', anchorPoint.updated_at.toISOString());

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<AnchorPoint>(this.apiUrl, body.toString(), { headers })
      .pipe(catchError(this.handleError<AnchorPoint>('createAnchorPoint')));
  }

  // Obtener todos los AnchorPoints
  getAnchorPoints(): Observable<AnchorPoint[]> {
    return this.http.get<AnchorPoint[]>(this.apiUrl)
      .pipe(catchError(this.handleError<AnchorPoint[]>('getAnchorPoints', [])));
  }

  // Obtener un AnchorPoint por ID
  getAnchorPoint(id: string): Observable<AnchorPoint> {
    return this.http.get<AnchorPoint>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError<AnchorPoint>('getAnchorPoint')));
  }

  // Actualizar un AnchorPoint
  updateAnchorPoint(id: string, anchorPoint: AnchorPoint): Observable<AnchorPoint> {
    const body = new URLSearchParams();
    body.set('spatial_data', JSON.stringify(anchorPoint.spatial_data)); // Convertir a JSON string
    body.set('metadata', JSON.stringify(anchorPoint.metadata)); // Convertir a JSON string
    body.set('user_data', JSON.stringify(anchorPoint.user_data)); // Convertir a JSON string
    body.set('animal_model_url', anchorPoint.animal_model_url);
    body.set('description', anchorPoint.description);
    body.set('created_at', anchorPoint.created_at.toISOString());
    body.set('updated_at', anchorPoint.updated_at.toISOString());

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.put<AnchorPoint>(`${this.apiUrl}/${id}`, body.toString(), { headers })
      .pipe(catchError(this.handleError<AnchorPoint>('updateAnchorPoint')));
  }

  // Eliminar un AnchorPoint
  deleteAnchorPoint(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError<void>('deleteAnchorPoint')));
  }

  // Manejar errores de la API
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
