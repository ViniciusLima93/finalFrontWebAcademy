import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { Turma } from './Turma';
import { TurmaService } from '../services/turma.service';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-turma',
  templateUrl: './turma.component.html',
  styleUrls: ['./turma.component.css'],
  standalone: true,
  imports:[
    FormsModule, 
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    HttpClientModule,
    CommonModule,
   MatSelectModule,
   MatSidenavModule,
   MatTableModule,

  ]
})
export class TurmaComponent implements OnInit {

  turmas: any[] = [];
  novaTurma: any = {};
  docentes: any[] = [];
  materias: any[] = [];
  turmaSelecionada: any = null;

  constructor(private turmaService: TurmaService) { }

  ngOnInit(): void {
    this.carregarTurmas();
    this.carregarDocentes();
    this.carregarMaterias();
    
  
  }

  carregarTurmas(): void {
    this.turmaService.listarTurmas().subscribe(turmas => {
      this.turmas = turmas;
      this.carregarNomesMateriaDocente();
    });

    this.turmas.push(...this.turmas);  
  }

  carregarDocentes(): void {
    this.turmaService.listarDocentes().subscribe(data => {
      this.docentes = data;
    });
  }

  carregarMaterias(): void {
    this.turmaService.listarMaterias().subscribe(data => {
      this.materias = data;
    });
  }

  carregarNomesMateriaDocente(): void {
    for (const turma of this.turmas) {
      this.turmaService.getNomeMateria(turma.ID_Materia).subscribe(nomeMateria => {
        turma.NomeMateria = nomeMateria.Nome;
      });
      this.turmaService.getNomeDocente(turma.Matricula_Docente).subscribe(nomeDocente => {
        turma.NomeDocente = nomeDocente.Nome;
      });
    }
  }

  cadastrarTurma(): void {
    this.turmaService.cadastrarTurma(this.novaTurma).subscribe(() => {
      this.carregarTurmas();
      this.novaTurma = {};
    });
    
  }

  alterarTurma(turma: any): void {
    this.turmaSelecionada = { ...turma };
  }

  cancelarEdicao(): void {
    this.turmaSelecionada = null;
  }

  confirmarEdicao(): void {
    this.turmaService.atualizarTurma(this.turmaSelecionada).subscribe(() => {
      this.carregarTurmas();
      this.turmaSelecionada = null;
    });
  }

  deletarTurma(idTurma: number): void {
    this.turmaService.deletarTurma(idTurma).subscribe(() => {

      this.turmas = this.turmas.filter(turma => turma.ID_Turma !== idTurma);
    }, error => {
      console.error('Erro ao deletar turma:', error);

    });
  }
}