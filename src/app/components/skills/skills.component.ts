import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    NgFor,
    MatProgressBarModule
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {

  habilidades = [
    { nombre: 'Angular', progreso: 80 }, // 4 de 5 puntos rellenos
    { nombre: 'Git', progreso: 60 },
    { nombre: 'SQL', progreso: 60 },
    { nombre: 'JavaScript', progreso: 80 },
    { nombre: 'PHP', progreso: 60 },
    { nombre: 'AWS', progreso: 60 },
    { nombre: 'Python', progreso: 20 },
    { nombre: 'Suite Office', progreso: 80 },
    { nombre: 'Nivel de inglés', progreso: 80 }
  ];

}
