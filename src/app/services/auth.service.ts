import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';  // Your backend API
  private tokenKey = 'auth_token';  // Key for storing the token in localStorage
  private loginStateSubject = new BehaviorSubject<boolean>(this.isLoggedIn()); // Keeps track of login state
  public loginState$ = this.loginStateSubject.asObservable();  // Observable to subscribe to login state changes

  constructor(private http: HttpClient) {}

  // Register new user
  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  // Login and store JWT token
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        // Store the JWT token in localStorage after login
        localStorage.setItem(this.tokenKey, response.access_token);
        this.loginStateSubject.next(true);  // Emit the login state as true
      })
    );
  }

  // Logout and remove token
  logout(): void {
    localStorage.removeItem(this.tokenKey);  // Remove token on logout
    this.loginStateSubject.next(false);  // Emit the login state as false
  }

  // Check if user is logged in by verifying if the token exists
  isLoggedIn(): boolean {
    return localStorage.getItem(this.tokenKey) !== null;  // If token exists, user is logged in
  }

  // Get the current JWT token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
