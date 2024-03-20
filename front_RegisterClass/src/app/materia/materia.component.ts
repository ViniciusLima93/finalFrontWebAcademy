import { Component, OnInit } from '@angular/core';
import { MateriaService } from '../services/materia.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';

import { ChangeDetectorRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css'],
  standalone: true,
  imports:[FormsModule,
          HttpClientModule,
          CommonModule,
        MatInputModule,
      MatButtonModule,
    MatIconModule,
  MatCardModule,
MatListModule,
MatSelectModule,
MatTableModule]
})
export class MateriaComponent implements OnInit {



  materias!: any[];
  cursos!: any[];
  detalhesMateria: any;
  detalhesCurso: any;

  novaMateria: any = {
    Nome: '',
    CargaHoraria: '',
    Ementa: '',
    fk_Curso_ID_Curso: null
  };

  constructor(private materiaService: MateriaService, private changeDetectorRef : ChangeDetectorRef ) { }

  ngOnInit(): void {
    this.getMaterias();
    this.getCursoList();
  }

  getMaterias(): void {
    this.materiaService.getMaterias().subscribe(materias => {
      this.materias = materias;
    });
  }

  mostrarDetalhes(materia: any): void {
    this.detalhesMateria = materia;
    this.materiaService.getCursoById(materia.fk_Curso_ID_Curso).subscribe(curso => {
      this.detalhesCurso = curso;
    });
  }

  getCursoList(): void {
    this.materiaService.getCursoList().subscribe(cursos => {
      this.cursos = cursos;
    });
  }

  adicionarMateria(): void {
    this.materiaService.adicionarMateria(this.novaMateria).subscribe(() => {
      this.novaMateria = {
        Nome: '',
        CargaHoraria: '',
        Ementa: '',
        fk_Curso_ID_Curso: null
      }});
      this.changeDetectorRef.detectChanges()
      this.getMaterias();

  }

  atualizarMateria(): void {
    this.materiaService.atualizarMateria(this.novaMateria).subscribe(() => {
      console.log('Matéria atualizada com sucesso!');
      this.novaMateria = {
        Nome: '',
        CargaHoraria: '',
        Ementa: '',
        fk_Curso_ID_Curso: null
      };
      this.getMaterias();
    }, error => {
      console.error('Erro ao atualizar matéria:', error);
    });
  }

  deletarMateria(materia: any): void {
    this.materiaService.deletarMateria(materia).subscribe(() => {
      console.log('Matéria deletada com sucesso!');
    }, error => {
      console.error('Erro ao deletar matéria:', error);
    });
    this.getMaterias();
  }

  editarMateria(materia: any): void {
    this.novaMateria = { ...materia };
  }

  cancelarEdicao(): void {
    this.novaMateria = {
      Nome: '',
      CargaHoraria: '',
      Ementa: '',
      fk_Curso_ID_Curso: null
    };
  }

}
