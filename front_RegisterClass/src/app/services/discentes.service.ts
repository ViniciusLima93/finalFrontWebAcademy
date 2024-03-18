import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscentesService {

  constructor(private http: HttpClient ) { }


  getDiscentes(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/discente');
  }

  getCursoById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/curso/${id}`);
  }

  getCursoList(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/curso');
  }

  adicionarDiscente(discente: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/discente', discente);
  }

  atualizarDiscente(discente: any): Observable<any> {
    return this.http.put<any>('http://localhost:3000/discente/' + discente.Matricula, discente);
  }

  deletarDiscente(discente: any): Observable<any> {
    return this.http.delete<any>('http://localhost:3000/discente/' + discente.Matricula);
  }

}
