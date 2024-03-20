import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../services/docente.service';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {

  docentes!: any[];

  novoDocente: any = {
    Nome: ''
  }

  constructor(private docenteService: DocenteService) { }

  ngOnInit(): void {
    this.getDocentes()
  }

  getDocentes() {
    return this.docenteService.getDoscentes().subscribe(docente => {
      this.docentes = docente
    })
  }

  cadastrarDocente(): void {
    this.docenteService.adicionarDocente(this.novoDocente).subscribe(() => {
      this.novoDocente = {
        Nome: ''
      }
    });
    this.getDocentes()
  }

  deletarDocente(docente: any): void {
    this.docenteService.deletarDocente(docente).subscribe(() => {
      console.log('Docente deletado com sucesso');
    })
    this.getDocentes()
  }



}
