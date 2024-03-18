import { Component, OnInit } from '@angular/core';
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
import { MatriculaTurmaService } from '../services/matricula-turma.service';

@Component({
  selector: 'app-presenca',
  templateUrl: './presenca.component.html',
  styleUrls: ['./presenca.component.css'],
  standalone: true, 
  imports : [
    CommonModule,
    HttpClientModule,
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
export class PresencaComponent implements OnInit {

  turmas: any [] = [];
  discentes: any [] = [];
  selectedTurma: any = null;
  matriculasDiscentesTurma: number[] = [];

  constructor(private turmaDiscente: MatriculaTurmaService) { }

  ngOnInit(): void {
    this.carregarTodasTurmas()
  }

  carregarTodasTurmas () : void {
    this.turmaDiscente.listarTodasTurmas().subscribe(turmas => {
      this.turmas = turmas
    })
  }

  Avaliacao(turma: any, index: number): void {
    const valorPresenca = document.getElementById(`presencaValor${index}`) as HTMLInputElement;
    const valorNota = document.getElementById(`notaFinalValor${index}`) as HTMLInputElement;

    if (valorPresenca !== null && valorNota !== null) {
        const auxPresenca = parseFloat(valorPresenca.value);
        const auxNota = parseFloat(valorNota.value);

        if (!isNaN(auxPresenca) && !isNaN(auxNota)) {
            turma.status = auxPresenca >= 75 && auxNota >= 6 ? 'Aprovado' : 'Reprovado';
        } else {
            turma.status = 'Valores de presença ou nota inválidos';
        }
    } else {
        turma.status = 'Elementos de presença ou nota não encontrados';
    }
}



}
