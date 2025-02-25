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

  // Get all drugs with optional search
  getDrugs(searchTerm?: string): Observable<Drug[]> {
    const params = searchTerm ? { params: { search: searchTerm } } : {};
    return this.http.get<Drug[]>(this.apiUrl, {
      headers: this.getAuthHeaders(),
      ...params
    });
  }


  // Get a specific drug by ID
  getDrugById(id: string): Observable<Drug> {
    return this.http.get<Drug>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Update drug stock
  updateDrugStock(id: string, stock: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/update/${id}`, {stock}, {
      headers: this.getAuthHeaders()
    });
  }

  addDrug(drug: Drug): Observable<Drug> {
    return this.http.post<Drug>(`${this.apiUrl}`, drug, {
      headers: this.getAuthHeaders()
    });
  }
  deleteDrug(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, {
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
