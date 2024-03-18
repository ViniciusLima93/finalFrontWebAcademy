import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from "../components/card/card.component";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import { TurmaComponent } from './turma/turma.component';
import { TurmaService } from './services/turma.service';
import { HttpClientModule } from '@angular/common/http';
import { MatriculaTurmaService } from './services/matricula-turma.service';
import { MateriaService } from './services/materia.service';
import { CursoService } from './services/curso.service';
import { InicioComponent } from './pages/inicio/inicio.component';
import { DiscenteComponent } from './discente/discente.component';
import { PresencaComponent } from './presenca/presenca.component';
import { AboutComponent } from './about/about.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        AppComponent,
        InicioComponent,
        AboutComponent,
      
     
        
  ],
    providers: [TurmaService, 
                MatriculaTurmaService, 
                MateriaService, 
                CursoService],
                
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NoopAnimationsModule,
        FormsModule,
        CardComponent,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatInputModule,
        MatGridListModule,
        HttpClientModule,
        MatCardModule
    ]
})
export class AppModule { }
