import { Component, TemplateRef, ViewChild, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';

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
    CommonModule,
    NgFor,
    NgIf,
  ],
})
export class ExperienceComponent {
  @ViewChild('dialogTemplate', { static: true }) dialogTemplate!: TemplateRef<any>;

  activeTabIndex: number = 0;

  techIcons: { [key: string]: string } = {
    Angular: 'iconos/angular.ico',
    Bootstrap: 'iconos/bootstrap.ico',
    JavaScript: 'iconos/js.ico',
    HTML5: 'iconos/html5.ico',
    CSS3: 'iconos/css3.ico',
    TypeScript: 'iconos/Typescript_logo_2020.svg',
  };

  // Proyectos
  projects = [
    {
      title: 'Recos.cl',
      description: 'Constructora.',
      image: 'img/header_Recos.png',
      fullimage: 'img/Recosfull.png',
      tags: ['Angular', 'Bootstrap', 'JavaScript'],
      details: `
        <p>WEB SPA informativa para proporcionar más información a los clientes y captar nuevas oportunidades de negocios.</p>
        <ul>
          <li>Slider de imágenes principal con transiciones animadas.</li>
          <li>Tarjetas descriptivas de misión, visión y valores corporativos.</li>
          <li>Galería de proyectos terminados con vistas detalladas y ampliables.</li>
        </ul>
      `,
    },
    {
      title: 'colegioangeles.cl',
      description: 'Colegio.',
      image: 'img/header_Angeles.png',
      fullimage: 'img/Angelesfull.png',
      tags: ['Angular','HTML5' , 'CSS3', 'JavaScript'],
      details: `
        <p>Información detallada del colegio.</p>
        <ul>
          <li>Galería de imágenes del colegio.</li>
          <li>Formulario de contacto con validación en tiempo real.</li>
        </ul>
      `,
    },
    {
      title: 'Tecnohoot',
      description: 'Soluciones tecnológicas.',
      image: 'img/header_tecnohoot.png',
      fullimage: 'img/Tecnofull.png',
      tags: ['html5', 'CSS'],
      details: `
        <p>WEB SPA para servicios tecnológicos.</p>
        <ul>
          <li>Galería de imágenes representativas.</li>
          <li>Botón de contacto funcional.</li>
        </ul>
      `,
    },
    {
      title: 'chileagrofood',
      description: 'Exportación de alimentos.',
      image: 'img/header_agro.png',
      fullimage: 'img/Angelesfull.png',
      tags: ['Vue.js', 'Tailwind CSS'],
      details: `
        <p>Información sobre exportación de alimentos.</p>
        <ul>
          <li>Información del proyecto en formato SPA.</li>
          <li>Botón de contacto funcional.</li>
        </ul>
      `,
    },
  ];

  // Experiencias
  experiences = [
    {
      position: 'Implementador Hospital Digital',
      institution: 'MINSAL',
      date: '2021 - 2024',
      description:
        'Prestando servicios como ingeniero en informática, apoyando en la gestión del cambio en proyectos de tecnologías de la información requeridos en MINSAL:',
      tasks: [
        'Levantamiento de procesos y análisis funcional de sistemas informáticos.',
        'Aprobar y gestionar usuarios de las diferentes soluciones tecnológicas.',
        'Acompañamiento en la gestión del cambio a los usuarios en la implementación e incorporación del uso de las tecnologías de la información.',
        'Capacitar a los equipos locales en las diferentes soluciones tecnológicas y a su vez en la transferencia de su conocimiento.',
        'Detectar oportunidades de mejora y realización de propuestas para mejorar las soluciones tecnológicas.',
      ],
    },
    {
      position: 'Administrativo y soporte técnico',
      institution: 'CESFAM Coltauco',
      date: '2017 – 2021',
      description:
        'Prestando servicios como técnico-administrativo y subrogante en el área de soporte técnico informático, desenvolviéndome en varios cargos de confianza como coordinador de SIGGES y subrogante de SOME.',
      tasks: [
        'Coordinación de sistemas informáticos.',
        'Gestión de procesos administrativos en el área de salud.',
        'Resolución de problemas técnicos.',
      ],
    },
  ];

  constructor(public dialog: MatDialog, private renderer: Renderer2) {}

  onTabChange(index: number): void {
    this.activeTabIndex = index;
    console.log(`Cambio detectado: Pestaña activa es ${index}`);
  }

  openDialog(project: {
    title: string;
    description: string;
    image: string;
    details: string;
  }): void {
    this.dialog.open(this.dialogTemplate, {
      data: project,
    });
  }
}
