import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://node-server-lilac-seven.vercel.app/api/users'; // API URL
  private authTokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  // Create a user
  createUser(user: User): Observable<User> {
    const body = new URLSearchParams();
    body.set('username', user.username);
    body.set('email', user.email);
    body.set('password', user.password_hash); // Assuming password is plain, hashed on backend
    body.set('user_role', user.user_role); // Add user role

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<User>(`${this.apiUrl}/register`, body.toString(), { headers })
      .pipe(catchError(this.handleError<User>('createUser')));
  }

  // Get a user by ID
  getUser(id: string): Observable<User> {
    const token = this.getToken();
    console.log(token)
    const headers = new HttpHeaders({
      'authorization': `${token}`,
    });
    return this.http.get<User>(`${this.apiUrl}/${id}`,{headers})
      .pipe(catchError(this.handleError<User>('getUser')));
  }

  // Get all users
  getUsers(): Observable<User[]> {
    const token = this.getToken();
    console.log(token)
    const headers = new HttpHeaders({
      'authorization': `${token}`,
    });

    return this.http.get<User[]>(this.apiUrl,{headers})
      .pipe(catchError(this.handleError<User[]>('getUsers', [])));
  }

  // Update a user
  updateUser(id: string, user: User): Observable<User> {
    const body = new URLSearchParams();
    body.set('username', user.username);
    body.set('email', user.email);
    body.set('password', user.password_hash); // Assuming password is plain, hashed on backend
    body.set('user_role', user.user_role); // Add user role

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.put<User>(`${this.apiUrl}/${id}`, body.toString(), { headers })
      .pipe(catchError(this.handleError<User>('updateUser')));
  }

  // Delete a user
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError<void>('deleteUser')));
  }

  // Login
  login(email: string, password: string): Observable<{ token: string }> {
    const body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, body.toString(), { headers }).pipe(
      tap(response => this.saveToken(response.token)),
      catchError(this.handleError<{ token: string }>('login'))
    );
  }

  // Save token to localStorage
  private saveToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  // Get the stored token
  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Logout
  logout(): void {
    localStorage.removeItem(this.authTokenKey);
  }

  // Handle API errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
