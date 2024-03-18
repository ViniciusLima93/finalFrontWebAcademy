import { Component, OnInit } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
})
export class HomeComponent implements OnInit  {
  inputValue: string = ''
  inputPassword: string = ''

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }
  fazerLogin(){
    console.log(this.inputValue)
    console.log(this.inputPassword)
    this.router.navigate(['/sobre'])
  }

}
