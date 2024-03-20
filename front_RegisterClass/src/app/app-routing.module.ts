import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { TurmaComponent } from './turma/turma.component';
import{MatriculaTurmaComponent} from './matricula-turma/matricula-turma.component'
import { CursoComponent } from './curso/curso.component';
import { MateriaComponent } from './materia/materia.component';
import { DiscenteComponent } from './discente/discente.component';
import { PresencaComponent } from './presenca/presenca.component';
import { AboutComponent } from './about/about.component';
import { DocenteComponent } from './docente/docente.component';

const routes: Routes = [

  {path: 'login', component: HomeComponent },
  
  {path: '', redirectTo: '/login', pathMatch: 'full' },

  {path: 'dashboard', component: DashboardComponent},


  {
    path:"sobre", component:AboutComponent
  },

  {
    path:'turma', component: TurmaComponent
  },
  {
    path:'matricula', component: MatriculaTurmaComponent
  },
  {
    path:'materia', component: MateriaComponent
  },
  {
    path:'curso', component: CursoComponent
  },
  {
    path:'discente', component: DiscenteComponent
  },
  {
    path:'docente', component: DocenteComponent
  },
  {
    path:'presenca', component: PresencaComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
