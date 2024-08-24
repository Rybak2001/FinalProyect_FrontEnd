import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://node-server-lilac-seven.vercel.app';
  private authTokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  // Crear un usuario
  createUser(user: User): Observable<User> {
    const body = new URLSearchParams();
    body.set('firstName', user.firstName);
    body.set('lastName', user.lastName);
    body.set('email', user.email);
    body.set('password', user.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<User>(`${this.apiUrl}/register`, body.toString(), { headers });
  }

  // Obtener un usuario por ID
  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  // Obtener todos los usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  // Actualizar un usuario
  updateUser(id: string, user: User): Observable<User> {
    const body = new URLSearchParams();
    body.set('firstName', user.firstName);
    body.set('lastName', user.lastName);
    body.set('email', user.email);
    body.set('password', user.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.put<User>(`${this.apiUrl}/users/${id}`, body.toString(), { headers });
  }

  // Eliminar un usuario
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }

  // Iniciar sesión
  login(email: string, password: string): Observable<{ token: string }> {
    const body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const tokengenerated='dsadsad'
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, body.toString(), { headers }).pipe(
      tap(response => this.saveToken(tokengenerated)),
      //tap(response => this.saveToken(response.token)), // Guardar el token en el localStorage
      catchError(this.handleError<{ token: string }>('login'))
    );
  }

  // Guardar el token en localStorage
  private saveToken(token: string): void {
    console.log("logeado")
    localStorage.setItem(this.authTokenKey, token);
  }

  // Obtener el token almacenado
  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  // Verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem(this.authTokenKey);
  }

  // Manejar errores de la API
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
