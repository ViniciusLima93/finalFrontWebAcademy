import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  private baseURL = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getDoscentes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/docente`)
  }

  adicionarDocente (docente: any): Observable<any[]> {
    return this.http.post<any>(`${this.baseURL}/docente`, docente)
  }

  deletarDocente (matricula: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/docente/${matricula}`)
  }
}
