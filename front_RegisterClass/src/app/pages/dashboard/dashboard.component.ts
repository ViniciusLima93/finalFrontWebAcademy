import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Curso } from 'src/app/services/Curso';
import { CursoService } from 'src/app/services/curso.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
 
})
export class DashboardComponent implements  AfterViewInit {
  @ViewChild('barGraph') canvasRef!: ElementRef;
  @ViewChild('pizzaGraph') pizzaRef! : ElementRef
  @ViewChild('lineGraph') lineRef! : ElementRef
  @ViewChild('contentToConvert') contentToConvert!: ElementRef
   
  bar: any;
  pizza: any;
  line: any;

  cursos: Curso[] = []

  dataLabelPizzaGraph:any[] = []


  constructor(private cursoService: CursoService) {}
   

  ngAfterViewInit(): void {

    this.loadCursos()

    const barGraph = this.canvasRef.nativeElement;
    this.bar = new Chart(barGraph, {
      type: 'bar',
      data: {
        labels: [ 20, 30, 50,],
        datasets: [
          {
            label: 'Matriculados',
            data: [  5,  7, 10],
            borderWidth:  1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    
    const pizzaGraph  = this.pizzaRef.nativeElement;
    this.pizza = new Chart (pizzaGraph, {
        type: 'pie',
        data: this.dataGraphPizza
       
    })

    const lineGraph = this.lineRef.nativeElement;
    this.line = new Chart ( lineGraph, {
        type: 'line',
        data: {
            labels: ['aprovados', 'reporvados'],
            datasets: [
                {
                    label: 'Aprovados x Reprovados',
                    data: ['10', '20', '30', '40', '50'],
                    borderWidth: 2
                }
            ]
        }

    })
   
 }

 loadCursos(): void {
  this.cursoService.getCursos()
  .subscribe(
    (cursos: Curso[]) => {
      this.cursos = cursos;
      const nameCurso = cursos.map(c => c.Nome);
      const vagasCurso = cursos.map(c => c.Vagas);
      this.updatePizzaDatas(nameCurso,vagasCurso)
    },
    error => {
      console.log('Error ao buscar cursos', error)
    }
  )
}

dataGraphPizza = {
labels: ['Red', 'Orange', 'Yellow', 'Green', 'Brown', 'Blue', 'Pink'],
datasets: [
  {
    label: 'Alunos',
    data:this.cursos,
    borderWidth: 1,
    backgroundColor: [
      'Red', 'Orange', 'Yellow', 'Green', 'Brown', 'Blue', 'Pink'
    ],
  }
]
}



updatePizzaDatas(labels: string[], vagas: number[]) {
if (this.pizza && this.pizza.data && this.pizza.data.datasets) {
   this.pizza.data.labels = labels;
   if (this.pizza.data.datasets[0]) {
     this.pizza.data.datasets[0].data = vagas;
   }
   this.pizza.update();
}
}

public downloadPDF() {
  const data = this.contentToConvert.nativeElement;
  html2canvas(data).then(canvas => {
    const imgWidth = 208;
    const pageHeight = 295;
    const imgHeight = canvas.height * imgWidth / canvas.width;
    const heightLeft = imgHeight;

    const contentDataURL = canvas.toDataURL('image/png');
    let pdf = new jsPDF('p', 'mm', 'a4');
    let position = 0;
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
    pdf.save('MYPdf.pdf');
  });
}
}

