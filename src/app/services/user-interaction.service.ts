import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserInteraction } from '../models/user-interaction.model';

@Injectable({
  providedIn: 'root'
})
export class UserInteractionService {
  private apiUrl = 'https://node-server-lilac-seven.vercel.app/api/userinteractions';

  constructor(private http: HttpClient) {}

  // Crear un UserInteraction
  createUserInteraction(userInteraction: UserInteraction): Observable<UserInteraction> {
    const body = new URLSearchParams();
    body.set('user_id', userInteraction.user_id);
    body.set('anchor_id', userInteraction.anchor_id);
    body.set('interaction_type', userInteraction.interaction_type);
    body.set('timestamp', userInteraction.timestamp.toISOString());

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<UserInteraction>(this.apiUrl, body.toString(), { headers })
      .pipe(catchError(this.handleError<UserInteraction>('createUserInteraction')));
  }

  // Obtener todos los UserInteractions
  getUserInteractions(): Observable<UserInteraction[]> {
    return this.http.get<UserInteraction[]>(this.apiUrl)
      .pipe(catchError(this.handleError<UserInteraction[]>('getUserInteractions', [])));
  }

  // Obtener un UserInteraction por ID
  getUserInteraction(id: string): Observable<UserInteraction> {
    return this.http.get<UserInteraction>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError<UserInteraction>('getUserInteraction')));
  }

  // Actualizar un UserInteraction
  updateUserInteraction(id: string, userInteraction: UserInteraction): Observable<UserInteraction> {
    const body = new URLSearchParams();
    body.set('user_id', userInteraction.user_id);
    body.set('anchor_id', userInteraction.anchor_id);
    body.set('interaction_type', userInteraction.interaction_type);
    body.set('timestamp', userInteraction.timestamp.toISOString());

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.put<UserInteraction>(`${this.apiUrl}/${id}`, body.toString(), { headers })
      .pipe(catchError(this.handleError<UserInteraction>('updateUserInteraction')));
  }

  // Eliminar un UserInteraction
  deleteUserInteraction(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError<void>('deleteUserInteraction')));
  }

  // Manejar errores de la API
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
