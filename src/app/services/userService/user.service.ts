import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/users'; 
  private adminApiUrl = 'http://localhost:5000/api/admin'; 

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  updateRole(userId: number, role: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/update/${userId}`, {role}, {
      headers: this.getAuthHeaders(),
    });
  }

  updateDrug(userId: number, drugs: (string | number)[]): Observable<any> {
    return this.http.patch(`${this.apiUrl}/update/${userId}`, {drug: drugs}, {
        headers: this.getAuthHeaders(),
    });
  }

  updateSpecialization(userId: number, specialization: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/update/${userId}`, {specialization}, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.adminApiUrl}/delete-user/${userId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  updateAge(userId: number, age: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/update/${userId}`, {age}, {
      headers: this.getAuthHeaders(),
    });
  }


  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    console.log("Token being sent:", token);

    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
    });
  }
}
