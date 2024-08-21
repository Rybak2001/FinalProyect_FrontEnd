import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://node-server-lilac-seven.vercel.app';

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

    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, body.toString(), { headers });
  }

  // Cerrar sesión
  logout(): void {
    // Aquí puedes eliminar el token de sesión guardado en localStorage o cookies
    localStorage.removeItem('authToken');
  }
}
