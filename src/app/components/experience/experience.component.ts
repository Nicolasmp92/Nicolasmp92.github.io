import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
  standalone: true,
  imports: [
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatDividerModule,
    NgFor
  ]
})
export class ExperienceComponent {
  @ViewChild('dialogTemplate', { static: true }) dialogTemplate!: TemplateRef<any>;

  projects = [
    { title: 'Recos.cl', description: 'Constructora.', image: 'img/header_Recos.png', fullimage:'img/Recosfull.png', details: 'WEB SPA informativa, para proporcionar mas informacion a los clientes y captar nuevas oportunidades de negocios.' },
    { title: 'colegioangeles.cl', description: 'Colegio Especial Ángeles.', image: 'img/header_Angeles.png',fullimage:'img/Angelesfull.png', details: 'Información detallada del proyecto 2.' },
    { title: 'Proyecto 3', description: 'Descripción breve del proyecto 3.', image: 'https://via.placeholder.com/150', details: 'Información detallada del proyecto 3.' }
  ];

  experiences = [
    {
      position: 'Implementador Hospital Digital',
      institution: 'MINSAL',
      date: '2021/Presente',
      description: 'Prestando servicios como ingeniero en informática, apoyando en la gestión del cambio en proyectos de tecnologías de la información requeridos en MINSAL:',
      tasks: [
        'Levantamiento de procesos y análisis funcional de sistemas informáticos.',
        'Aprobar y gestionar usuarios de las diferentes soluciones tecnológicas.',
        'Acompañamiento en la gestión del cambio a los usuarios en la implementación e incorporación del uso de las tecnologías de la información.',
        'Capacitar a los equipos locales en las diferentes soluciones tecnológicas y a su vez en la transferencia de su conocimiento.',
        'Detectar oportunidades de mejora y realización de propuestas para mejorar las soluciones tecnológicas.'
      ]
    },
    {
      position: 'Administrativo y soporte técnico',
      institution: 'CESFAM',
      date: '2017 – 2021',
      description: 'Prestando servicios como técnico-administrativo y subrogante en el área de soporte técnico informático, desenvolviéndome en varios cargos de confianza como coordinador de SIGGES y subrogante de SOME.'
    }
  ];

  constructor(public dialog: MatDialog) {}

  openDialog(project: { title: string; description: string; image: string; details: string }): void {
    this.dialog.open(this.dialogTemplate, {
      data: project
    });
  }
}
