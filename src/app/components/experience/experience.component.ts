import { Component, TemplateRef, ViewChild, Renderer2,ViewEncapsulation  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';
import { ListKeyManager } from '@angular/cdk/a11y';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
  encapsulation: ViewEncapsulation.None,
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
    AngularMaterial: 'iconos/Material.svg',
  };


 // Proyectos
projects = [
  {
    title: 'Recos.cl',
    description: 'Constructora.',
    estado: 'En Desarrollo',
    image: 'img/header_Recos.png',
    fullimage: 'img/Recosfull.png',
    tags: ['Angular', 'Bootstrap', 'HTML5', 'CSS3', 'JavaScript'],
    seoTags: [
      'construcción',
      'remodelación',
      'proyectos',
      'contratistas',
      'edificación',
      'diseño de interiores',
      'recos',
      'constructora en Chile'
    ],
    details: `
      <p>WEB SPA informativa para proporcionar más información a los clientes y captar nuevas oportunidades de negocios.</p>
      <ul>
        <li>Slider de imágenes principal con transiciones animadas.</li>
        <li>Tarjetas descriptivas de misión, visión y valores corporativos.</li>
        <li>Quienes somos: apartado de historia de la empresa y fotos de los fundadores.</li>
        <li>Galería de proyectos terminados con vistas detalladas y ampliables.</li>
        <li>Apartado mis clientes.</li>
        <li>Formulario de contacto.</li>
        <li>Mi ubicasion en Google maps.</li>
      </ul>
    `,
  },
  {
    title: 'colegioangeles.cl',
    description: 'Colegio.',
    estado: 'Finalizada 2024',
    Link: 'https://colegioangeles.cl/',
    image: 'img/header_Angeles.png',
    fullimage: 'img/Angelesfull.png',
    tags: ['Angular', 'Bootstrap', 'HTML5', 'CSS3', 'JavaScript'],
    seoTags: [
      'educación',
      'colegio especial',
      'aprendizaje inclusivo',
      'escuelas en Chile',
      'educación gratuita',
      'proyectos escolares',
      'matrículas',
      'educación para niños especiales'
    ],
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
    estado: 'Finalizada 2024',
    image: 'img/header_tecnohoot.png',
    fullimage: 'img/Tecnofull.png',
    tags: ['HTML5', 'CSS3'],
    seoTags: [
      'soluciones tecnológicas',
      'desarrollo web',
      'software empresarial',
      'aplicaciones SPA',
      'tecnología avanzada',
      'automatización de procesos',
      'tecnohoot',
      'consultoría tecnológica'
    ],
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
    estado: 'En Desarrollo',
    image: 'img/header_agro.png',
    fullimage: 'img/Angelesfull.png',
    tags: ['Bootstrap', 'HTML5', 'CSS3'],
    seoTags: [
      'exportación de alimentos',
      'agricultura en Chile',
      'productos naturales',
      'exportación internacional',
      'frutas y verduras',
      'comercio agrícola',
      'chileagrofood',
      'exportación de calidad'
    ],
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
