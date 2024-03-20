import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { DiscentesService } from '../services/discentes.service';

@Component({
  selector: 'app-discente',
  templateUrl: './discente.component.html',
  styleUrls: ['./discente.component.css'],
  standalone:true,
  imports: [
    FormsModule,
    CommonModule,
        MatInputModule,
      MatButtonModule,
    MatIconModule,
  MatCardModule,
MatListModule,
MatSelectModule,
MatTableModule
  ]
})
export class DiscenteComponent implements OnInit {

  discentes!: any[];
  cursos!: any[];
  

  novoDiscente: any = {
    Nome: '',
    Nascimento: '',
    Email:''
  } 



  constructor(private discenteService: DiscentesService) { }

  ngOnInit(): void {
    this.getDiscentes()
  
  }

  getDiscentes(): void {
    this.discenteService.getDiscentes().subscribe(discente => {
      this.discentes = discente
    })
  };

  adicionarDiscentes(): void {
    this.discenteService.adicionarDiscente(this.novoDiscente).subscribe(() => {
      this.novoDiscente = {
        Nome: '',
        Nascimento: '',
        Email: ''
      }});
      this.getDiscentes()
    
  }

  atualizarDiscente(): void {
    this.discenteService.atualizarDiscente(this.novoDiscente).subscribe(() => {
      console.log('Discente Atualizado com sucesso');
      this.novoDiscente = {
        Nome: '',
        Nascimento: '',
        Email: ''
      };
      this.getDiscentes()
    }, error => {
      console.log('Erro ao atualizar discente', error)
    })
  }

  deletarDiscente(discente: any): void {
    this.discenteService.deletarDiscente(discente).subscribe(() => {
      console.log('Discente deletado com sucesso');
      this.getDiscentes()

    }, error => {
      console.error('Erro ao deletar discente', error)
    })
  }

  cancelarEdicao(): void {
    this.novoDiscente = {
      Nome: '',
      Nascimento: '',
      Email: '',
    };
  }

}
