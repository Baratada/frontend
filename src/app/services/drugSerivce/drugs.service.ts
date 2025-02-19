import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Drug } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DrugService {
  private apiUrl = 'http://localhost:5000/api/drugs';

  constructor(private http: HttpClient) { }

  // Get all drugs
  getDrugs(): Observable<Drug[]> {
    return this.http.get<Drug[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  // Get a specific drug by ID
  getDrugById(id: number): Observable<Drug> {
    return this.http.get<Drug>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Helper function to get Authorization headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }
}
