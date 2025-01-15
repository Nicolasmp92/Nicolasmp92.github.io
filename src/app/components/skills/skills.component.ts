import { Component } from '@angular/core';
import { NgFor, NgStyle } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [NgFor, NgStyle],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent {
  habilidadesFront = [
    { icono: 'iconos/angular.ico', nombre: 'Angular', progreso: 90, actualProgreso: 0, color: '#028391' },
    { icono: 'iconos/js.ico', nombre: 'JavaScript', progreso: 85, actualProgreso: 0, color: '#FEAE6F' },
    { icono: 'iconos/html5.ico', nombre: 'HTML5', progreso: 95, actualProgreso: 0, color: '#f8f9fa' },
    { icono: 'iconos/css3.ico', nombre: 'CSS3', progreso: 80, actualProgreso: 0, color: '#028391' },
    { icono: 'iconos/bootstrap.ico', nombre: 'Bootstrap', progreso: 75, actualProgreso: 0, color: '#FEAE6F' },
  ];


    habilidadesBack = [
      { icono: 'iconos/node-js.svg', nombre: 'Node.js', progreso: 70, actualProgreso: 0, color: '#028391' },
      { icono: 'iconos/apache.svg', nombre: 'Apache', progreso: 60, actualProgreso: 0, color: '#FEAE6F' },
      { icono: 'iconos/mongodb.svg', nombre: 'MongoDB', progreso: 65, actualProgreso: 0, color: '#f8f9fa' },
      { icono: 'iconos/mysql.svg', nombre: 'MySQL', progreso: 80, actualProgreso: 0, color: '#028391' },
      { icono: 'iconos/python.svg', nombre: 'Python', progreso: 70, actualProgreso: 0, color: '#FEAE6F' },
  ];



  constructor() {}

  ngOnInit(): void {
    this.animateProgress();
  }

  animateProgress() {
    const interval = setInterval(() => {
      let allCompleted = true;

      // Animate Front-End Skills
      this.habilidadesFront.forEach(skill => {
        if (skill.actualProgreso < skill.progreso) {
          skill.actualProgreso++;
          allCompleted = false;
        }
      });

      // Animate Back-End Skills
      this.habilidadesBack.forEach(skill => {
        if (skill.actualProgreso < skill.progreso) {
          skill.actualProgreso++;
          allCompleted = false;
        }
      });

      if (allCompleted) {
        clearInterval(interval);
      }
    }, 20); // Adjust speed of the animation
  }
}
