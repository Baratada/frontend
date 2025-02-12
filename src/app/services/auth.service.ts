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
  private roleKey = 'user_role'; // Key for storing user role in localStorage
  private userIdKey = 'user_id'; // Key for storing user id in localStorage

  private loginStateSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  public loginState$ = this.loginStateSubject.asObservable();

  private roleSubject = new BehaviorSubject<string | null>(this.getRole());
  public role$ = this.roleSubject.asObservable();  // Observable to track role changes

  private userIdSubject = new BehaviorSubject<string | null>(this.getUserId());
  public userId$ = this.userIdSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.access_token);
        localStorage.setItem(this.roleKey, response.role); // Store the role
        localStorage.setItem(this.userIdKey, this.decodeJwtToken(response.access_token)?.id || ''); // Extract and store user id from JWT
        this.loginStateSubject.next(true);
        this.roleSubject.next(response.role);
        this.userIdSubject.next(this.decodeJwtToken(response.access_token)?.id || ''); // Update userId from JWT
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem(this.userIdKey);
    this.loginStateSubject.next(false);
    this.roleSubject.next(null); // Reset the role
    this.userIdSubject.next(null); // Reset the user id
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.tokenKey) !== null;
  }

  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  getUserId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }

  // Decode the JWT token and return the user ID
  private decodeJwtToken(token: string): any | null {
    const tokenParts = token.split('.'); // JWT is split into 3 parts
    if (tokenParts.length === 3) {
      const payload = tokenParts[1]; // Get the payload part
      const decoded = atob(payload); // Decode the payload from base64
      const parsed = JSON.parse(decoded); // Parse the decoded JSON
      return parsed.sub; // Return the user_id (commonly in 'sub' field, but check your backend's JWT format)
    }
    return null;
  }
}
