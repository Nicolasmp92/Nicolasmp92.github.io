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
    {
      title: 'Recos.cl',
      description: 'Constructora.',
      image: 'img/header_Recos.png',
      fullimage: 'img/Recosfull.png',
      details: `
        <p>WEB SPA informativa para proporcionar más información a los clientes y captar nuevas oportunidades de negocios.</p>
        <ul>
          <li>Slider de imágenes principal.</li>
          <li>Tarjetas descriptivas de misión, visión y valores.</li>
          <li>Sección del equipo con descripción e imagen representativa.</li>
          <li>Galería de proyectos con miniaturas y detalles.</li>
          <li>Logotipos de clientes destacados.</li>
          <li>Formulario de contacto funcional con campos de nombre, teléfono, correo y mensaje.</li>
          <li>Botones para redes sociales en el pie de página.</li>
        </ul>
      `,
    },
    {
      title: 'colegioangeles.cl',
      description: 'Colegio Ángeles.',
      image: 'img/header_Angeles.png',
      fullimage: 'img/Angelesfull.png',
      details: `
        <p>Información detallada del proyecto 2.</p>
        <ul>
          <li>Slider principal.</li>
          <li>Información institucional destacada.</li>
          <li>Galería de imágenes del colegio.</li>
          <li>Formulario de contacto con campos de texto.</li>
          <li>Botones para redes sociales.</li>
        </ul>
      `,
    },
    {
      title: 'Proyecto 3',
      description: 'Descripción breve del proyecto 3.',
      image: 'https://via.placeholder.com/150',
      details: `
        <p>Información detallada del proyecto 3.</p>
        <ul>
          <li>Información del proyecto en formato SPA.</li>
          <li>Galería de imágenes representativas.</li>
          <li>Botón de contacto.</li>
        </ul>
      `,
    },
  ];
  habilidadesFront = [
    { icono: 'iconos/angular.ico', nombre: 'Angular', progreso: 80 },
    { icono: 'iconos/js.ico', nombre: 'JavaScript', progreso: 80 },
    { icono: 'iconos/html5.ico', nombre: 'HTML5', progreso: 80 },
    { icono: 'iconos/css3.ico', nombre: 'CSS3', progreso: 80 },
    { icono: 'iconos/bootstrap.ico', nombre: 'Bootstrap5ñ', progreso: 80 },];

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
