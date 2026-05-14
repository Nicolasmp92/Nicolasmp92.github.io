import { Component, ViewChild } from '@angular/core';
import { NgFor, NgStyle, CommonModule } from '@angular/common';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [NgFor, NgStyle, MatDialogModule, MatIconModule, MatButtonModule, CommonModule, AnimateOnScrollDirective],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent {
  habilidadesFront = [
    { nombre: 'Angular',      progreso: 85, actualProgreso: 0, certificado: 'angular35.5.pdf', detalles: 'Angular de cero a experto 35.5 horas.' },
    { nombre: 'JavaScript',   progreso: 85, actualProgreso: 0, certificado: 'JS1.pdf',          detalles: 'JavaScript avanzado.' },
    { nombre: 'TypeScript',   progreso: 80, actualProgreso: 0, certificado: '',                detalles: '' },
    { nombre: 'Bootstrap',    progreso: 90, actualProgreso: 0, certificado: 'bootstrap.pdf',   detalles: 'Framework de diseño Bootstrap.' },
    { nombre: 'Tailwind CSS', progreso: 78, actualProgreso: 0, certificado: '',                detalles: '' },
    { nombre: 'Livewire',     progreso: 75, actualProgreso: 0, certificado: '',                detalles: '' },
    { nombre: 'Flutter',      progreso: 50, actualProgreso: 0, certificado: '',                detalles: '' },
  ];

  habilidadesBack = [
    { nombre: 'PHP / Laravel', progreso: 82, actualProgreso: 0, certificado: '', detalles: '' },
    { nombre: 'Node.js',       progreso: 70, actualProgreso: 0, certificado: 'nodejs.pdf', detalles: 'Backend con Node.js.' },
    { nombre: 'Go',            progreso: 55, actualProgreso: 0, certificado: '', detalles: '' },
    { nombre: 'MySQL',         progreso: 81, actualProgreso: 0, certificado: 'mysql.pdf',  detalles: 'Bases de datos con MySQL.' },
    { nombre: 'PostgreSQL',    progreso: 72, actualProgreso: 0, certificado: '', detalles: '' },
    { nombre: 'APIs REST',     progreso: 83, actualProgreso: 0, certificado: '', detalles: '' },
  ];

  devopsSkills = [
    'Git', 'GitHub', 'Docker', 'Docker Desktop',
    'Vite', 'XAMPP', 'CI/CD básico', 'Control de versiones',
    'Despliegue en entornos reales',
  ];

  softSkills = [
    'Levantamiento de requerimientos', 'Reingeniería de procesos',
    'Power BI', 'Documentación técnica',
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
    this.dialog.open(this.dialogTemplate, {
      data: {
        nombre: skill.nombre,
        certificado: safeUrl,
        detalles: skill.detalles
      }
    });
  }
}
