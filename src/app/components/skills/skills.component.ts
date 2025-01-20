import { Component, ViewChild } from '@angular/core';
import { NgFor, NgStyle, CommonModule } from '@angular/common';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [NgFor, NgStyle, MatDialogModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent {
  habilidadesFront = [
    { icono: 'angular.ico', nombre: 'Angular', progreso: 85, actualProgreso: 0, certificado: 'angular35.5.pdf', detalles: 'Angular de cero a experto 35.5 horas.' },
    { icono: 'js.ico', nombre: 'JavaScript', progreso: 85, actualProgreso: 0, certificado: 'JS1.pdf' , certificado2: 'JS2.pdf', detalles: 'JavaScript avanzado.' },
    { icono: 'html5.ico', nombre: 'HTML5', progreso: 97, actualProgreso: 0, certificado: 'html5.pdf', detalles: 'HTML5 y su estructura semántica.' },
    { icono: 'css3.ico', nombre: 'CSS3', progreso: 85, actualProgreso: 0, certificado: 'css.pdf', detalles: 'CSS3 para estilos avanzados.' },
    { icono: 'bootstrap.ico', nombre: 'Bootstrap', progreso: 90, actualProgreso: 0, certificado: 'bootstrap.pdf', detalles: 'Framework de diseño Bootstrap.' },
  ];

  habilidadesBack = [
    { icono: 'node-js.svg', nombre: 'Node.js', progreso: 70, actualProgreso: 0, certificado: 'nodejs.pdf', detalles: 'Backend con Node.js.' },
    { icono: 'apache.svg', nombre: 'Apache', progreso: 60, actualProgreso: 0, certificado: 'apache.pdf', detalles: 'Configuración de servidores Apache.' },
    { icono: 'mysql.png', nombre: 'MySQL', progreso: 81, actualProgreso: 0, certificado: 'mysql.pdf', detalles: 'Bases de datos con MySQL.' },
    { icono: 'python.svg', nombre: 'Python', progreso: 40, actualProgreso: 0, certificado: 'python.pdf', detalles: 'Programación en Python.' },
    { icono: 'Ruby.png', nombre: 'Ruby', progreso: 60, actualProgreso: 0, certificado: 'ruby.pdf', detalles: 'Ruby on Rails desarrollo web.' }
  ];

  @ViewChild('dialogTemplate') dialogTemplate: any;

  constructor(private dialog: MatDialog, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.animateProgress();
  }

  animateProgress() {
    const interval = setInterval(() => {
      let allCompleted = true;
      [...this.habilidadesFront, ...this.habilidadesBack].forEach(skill => {
        if (skill.actualProgreso < skill.progreso) {
          skill.actualProgreso++;
          allCompleted = false;
        }
      });
      if (allCompleted) {
        clearInterval(interval);
      }
    }, 20);
  }

  openDialog(skill: any) {
    const safeUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('pdf/' + skill.certificado);
    console.log('Abriendo certificado:', safeUrl);
    this.dialog.open(this.dialogTemplate, {
      data: {
        nombre: skill.nombre,
        certificado: safeUrl,
        detalles: skill.detalles
      }
    });
  }
}
