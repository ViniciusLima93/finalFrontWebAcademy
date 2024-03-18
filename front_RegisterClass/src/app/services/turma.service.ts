import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turma } from '../turma/Turma';


@Injectable({
  providedIn: 'root'
})
export class TurmaService {
  
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  cadastrarTurma(turma: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/turma`, turma);
  }

  listarTurmas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/turma`);
  }

  listarDocentes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/docente`);
  }

  listarMaterias(): Observable<any> {
    return this.http.get(`${this.baseUrl}/materia`);
  }

  getNomeMateria(idMateria: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/materia/${idMateria}`);
  }

  getNomeDocente(matricula: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/docente/${matricula}`);
  }

  deletarTurma(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/turma/${id}`);
  }

  atualizarTurma(turma: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/turma/${turma.ID_Turma}`, turma);
  }
}
