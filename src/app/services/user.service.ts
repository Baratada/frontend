import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';  // Adjust import path if necessary

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/users'; 
  private adminApiUrl = 'http://localhost:5000/api/admin'; 


  constructor(private http: HttpClient) {}

  // Get Users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, {
      headers: this.getAuthHeaders(),
    });  // Get all users
  }

  // Get User by ID
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });  // API call to get a single user by ID
  }

  // Update User Role
  updateRole(userId: number, role: string): Observable<any> {
    return this.http.patch(`${this.adminApiUrl}/update-role/${userId}`, { role }, {
      headers: this.getAuthHeaders(),
    });  // Update user role
  }

  // Delete User
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.adminApiUrl}/delete-user/${userId}`, {
      headers: this.getAuthHeaders(),
    });  // Delete user by ID
  }

  // Helper function to get Authorization headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');  // Retrieve 'access_token' from local storage
    console.log("Token being sent:", token);

    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',  // Attach token if it exists
    });
  }
}
