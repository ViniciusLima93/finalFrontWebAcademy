import { Component, OnInit } from '@angular/core';
import { MatriculaTurmaService } from '../services/matricula-turma.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-matricula-turma',
  templateUrl: './matricula-turma.component.html',
  styleUrls: ['./matricula-turma.component.css'],
  standalone: true,
  imports:[
  HttpClientModule,
  CommonModule,
  FormsModule,
  MatListModule,
  MatSelectModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatSidenavModule,
  MatButtonToggleModule

]
})
export class MatriculaTurmaComponent implements OnInit {
   

  turmas: any[] = [];
  selectedTurma: any = null;
  mostrarOpcoes: boolean = false;
  discentesTurma: any[] = [];
  matriculasDiscentesTurma: number[] = [];
  discentes: any[] = [];
  novaMatricula: number | null = null;

  constructor(private matriculaTurma: MatriculaTurmaService) { }

  ngOnInit(): void {
    this.carregarTurmas();
    this.carregarDiscentes();
    setTimeout(()=>{
      console.log( this.carregarDiscentes())
    },5000)
  }

  carregarTurmas(): void {
    this.matriculaTurma.listarTurmas().subscribe(turmas => {
      this.turmas = turmas;
    });
  }

  carregarDiscentes(): void {
    this.matriculaTurma.listarDiscentes().subscribe(discentes => {
      this.discentes = discentes;
    });
  }

  mostrarOpcoesTurma(turma: any): void {
    this.selectedTurma = turma;
    this.mostrarOpcoes = !this.mostrarOpcoes;
    this.carregarDiscentesTurma(turma.ID_Turma);
    this.carregarMatriculasDiscentesTurma(turma.ID_Turma);
    
  }

  carregarDiscentesTurma(idTurma: number): void {
    this.matriculaTurma.listarTurmaDiscente(idTurma).subscribe(discentes => {
      this.discentesTurma = discentes;
    });
  }

  carregarMatriculasDiscentesTurma(idTurma: number): void {
    this.matriculaTurma.listarMatriculasDiscentesTurma(idTurma).subscribe(matriculas => {
      this.matriculasDiscentesTurma = matriculas.map((item: any) => item.Matricula_Discente);
    });
  }

  cadastrarMatricula(): void {
    if (this.novaMatricula !== null && this.novaMatricula !== undefined) {
      this.matriculaTurma.cadastrarMatricula({ ID_Turma: this.selectedTurma.ID_Turma, Matricula_Discente: this.novaMatricula }).subscribe(() => {
        this.carregarDiscentesTurma(this.selectedTurma.ID_Turma);
        this.carregarMatriculasDiscentesTurma(this.selectedTurma.ID_Turma);
        this.novaMatricula = null;
      });
    }
  }

  deletarMatricula(idTurma: number, matriculaDiscente: number): void {
    this.matriculaTurma.deletarMatricula(idTurma, matriculaDiscente).subscribe(() => {
      this.carregarMatriculasDiscentesTurma(idTurma);
    });
  }  

}
