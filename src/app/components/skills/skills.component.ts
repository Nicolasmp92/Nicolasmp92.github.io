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

  habilidadesFront = [
    { icono: 'iconos/angular.ico', nombre: 'Angular', progreso: 80 },
    { icono: 'iconos/js.ico', nombre: 'JavaScript', progreso: 80 },
    { icono: 'iconos/html5.ico', nombre: 'HTML5', progreso: 80 },
    { icono: 'iconos/css3.ico', nombre: 'CSS3', progreso: 80 },
    { icono: 'iconos/bootstrap.ico', nombre: 'Bootstrap5ñ', progreso: 80 },
    { icono: 'iconos/angular.ico', nombre: 'Git', progreso: 60 },
    { icono: 'iconos/angular.ico', nombre: 'AWS', progreso: 60 },
    { icono: 'iconos/angular.ico', nombre: 'Suite Office', progreso: 80 },
    { icono: 'iconos/angular.ico', nombre: 'Nivel de inglés', progreso: 80 }
  ];
  habilidadesBack = [
    { nombre: 'Java', progreso: 20 },
    { nombre: 'Sql', progreso:60},
    { nombre: 'PHP', progreso: 60 },
    { nombre: 'Python', progreso: 20 },


  ];

}
