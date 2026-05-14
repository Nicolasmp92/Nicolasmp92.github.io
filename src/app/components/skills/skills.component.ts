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
    { nombre: 'Angular',      progreso: 85, actualProgreso: 0, certificados: [{ label: 'Angular 33.5h', archivo: 'Angular de cero a experto - 33.5 horas - UC-d1ec3fe5-63a3-4901-8533-d80e1fbd9b0d.pdf' }] },
    { nombre: 'JavaScript',   progreso: 85, actualProgreso: 0, certificados: [{ label: 'JavaScript Pt.1', archivo: 'JS1.pdf' }, { label: 'JavaScript Pt.2', archivo: 'JS2.pdf' }] },
    { nombre: 'TypeScript',   progreso: 80, actualProgreso: 0, certificados: [] },
    { nombre: 'Bootstrap',    progreso: 90, actualProgreso: 0, certificados: [{ label: 'Bootstrap5 34h', archivo: 'Bootstrap5 - 34 horas - UC-763315b8-44e2-4cd0-8697-d2135ad7125e.pdf' }] },
    { nombre: 'CSS3',         progreso: 88, actualProgreso: 0, certificados: [{ label: 'CSS Avanzado', archivo: 'CSS20P.pdf' }] },
    { nombre: 'Tailwind CSS', progreso: 78, actualProgreso: 0, certificados: [] },
    { nombre: 'Livewire',     progreso: 75, actualProgreso: 0, certificados: [] },
    { nombre: 'Flutter',      progreso: 50, actualProgreso: 0, certificados: [] },
  ];

  habilidadesBack = [
    { nombre: 'PHP / Laravel',    progreso: 82, actualProgreso: 0, certificados: [] },
    { nombre: 'Java Spring Boot', progreso: 70, actualProgreso: 0, certificados: [{ label: 'Spring Boot 12.5h', archivo: 'java Spring Boot - 12.5 horas - UC-f8717973-16ff-4805-92b5-38f1e84b476e.pdf' }] },
    { nombre: 'Ruby',             progreso: 65, actualProgreso: 0, certificados: [{ label: 'Ruby OOP 8h', archivo: 'Ruby Curso de programacion orientada a objetos desde 0 - 8 horas- UC-1a63e951-dcdf-4f49-a6ef-3c68fcbfbb99.pdf' }, { label: 'Ruby + Rails 11h', archivo: 'Ruby desde las bases hasta rails -11horas - UC-df1dcd02-6dd1-4a36-afb9-97a3a7ef85f7.pdf' }] },
    { nombre: 'Node.js',          progreso: 70, actualProgreso: 0, certificados: [] },
    { nombre: 'Go',               progreso: 55, actualProgreso: 0, certificados: [] },
    { nombre: 'MySQL',            progreso: 81, actualProgreso: 0, certificados: [] },
    { nombre: 'PostgreSQL',       progreso: 72, actualProgreso: 0, certificados: [] },
    { nombre: 'APIs REST',        progreso: 83, actualProgreso: 0, certificados: [] },
  ];

  devopsSkills = [
    'Git', 'GitHub', 'Docker', 'Docker Desktop',
    'Vite', 'XAMPP', 'CI/CD básico', 'Control de versiones',
    'Despliegue en entornos reales',
  ];

  certificadosExtras = [
    { nombre: 'Git & GitHub', certificados: [{ label: 'Git + GitHub 12h', archivo: 'GIT + GITHUB TODO UN SISTEMA DE CONTROL DE VERSIONES - 12 HORAS - UC-53da7bcd-51fc-4ed5-9969-9c1ed24bc78e.pdf' }] },
    { nombre: 'Power BI',     certificados: [{ label: 'Power BI 15.5h',   archivo: 'Powe BI -15.5 horas - UC-0bb111f7-63ba-461f-92b9-2eeedcc44cb7.pdf' }] },
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

  openDialog(nombre: string, cert: { label: string; archivo: string }) {
    const safeUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('pdf/' + cert.archivo);
    this.dialog.open(this.dialogTemplate, {
      data: {
        nombre: nombre,
        certificado: safeUrl,
        detalles: cert.label
      }
    });
  }
}
