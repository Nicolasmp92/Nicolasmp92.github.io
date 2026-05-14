import { Component, TemplateRef, ViewChild, Renderer2,ViewEncapsulation  } from '@angular/core';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
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
    AnimateOnScrollDirective,
  ],
})
export class ExperienceComponent {
  @ViewChild('dialogTemplate', { static: true }) dialogTemplate!: TemplateRef<any>;

  activeTabIndex: number = 0;

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
      position: 'Desarrollador Full Stack',
      institution: 'QzAgres',
      date: 'Jun 2025 – Dic 2025',
      description:
        'Diseñé e implementé la arquitectura de módulos de gestión con Laravel y Livewire, optimizando el cálculo dinámico de datos y reduciendo los tiempos de respuesta operativa.',
      tasks: [
        'Diseñé e implementé arquitectura de módulos de gestión con Laravel y Livewire.',
        'Optimicé procesos internos mediante lógica aplicada y cálculo dinámico de datos, reduciendo significativamente los tiempos de ejecución manual.',
        'Programé sistemas de generación de reportes profesionales en PDF y Excel integrados a flujos de trabajo organizacionales.',
        'Lideré el levantamiento de requerimientos junto a usuarios finales para asegurar soluciones robustas y mantenibles.',
      ],
    },
    {
      position: 'Analista de Gestión (Reemplazos)',
      institution: 'Hospital Dr. Franco Rivera Zunino',
      date: 'Ene 2025 – Jun 2025',
      description:
        'Supervisión y análisis de indicadores institucionales, asegurando la calidad del dato y el cumplimiento de metas sanitarias.',
      tasks: [
        'Control de indicadores institucionales y aseguramiento de calidad del dato.',
        'Validación técnica en sistemas de gestión presupuestaria.',
        'Soporte técnico en la unidad de priorización operativa.',
      ],
    },
    {
      position: 'Analista Funcional / Implementador Digital',
      institution: 'Hospital Digital — MINSAL',
      date: 'Nov 2021 – Jul 2024',
      description:
        'Documenté y levanté procesos para servicios clínicos críticos como TeleSalud, TeleACV y TeleOncología, coordinando la implementación de plataformas de telemedicina.',
      tasks: [
        'Documentación y levantamiento de procesos para servicios clínicos críticos (TeleSalud, TeleACV, TeleOncología).',
        'Coordinación de la implementación de plataformas de telemedicina y soporte remoto.',
        'Liderazgo en capacitación técnica y funcional de equipos multidisciplinarios para la adopción de nuevas plataformas institucionales.',
      ],
    },
    {
      position: 'Soporte TI & Coordinador SIGGES',
      institution: 'CESFAM Coltauco',
      date: 'Ene 2017 – Oct 2021',
      description:
        'Responsable de la continuidad operativa de plataformas internas de gestión y bases de datos locales, actuando como coordinador SIGGES y subrogante administrativo.',
      tasks: [
        'Administración y continuidad operativa de plataformas internas de gestión y bases de datos locales.',
        'Coordinador SIGGES y subrogante administrativo.',
        'Garantía del cumplimiento de estándares TI en salud pública.',
      ],
    },
  ];

  // Freelancer (actual)
  freelancer = {
    position: 'Desarrollador Full Stack Freelance',
    date: '2024 – Actualidad',
    description: 'Desarrollo de soluciones web a medida para diversas empresas, ofreciendo servicios especializados en front-end, back-end y diseño responsivo.',
    clients: [
      {
        name: 'Wali',
        service: 'Desarrollo de soluciones web a medida',
      },
      {
        name: 'Tecnohoot',
        service: 'Soluciones tecnológicas y landing pages',
      },
    ],
  };

  constructor(public dialog: MatDialog, private renderer: Renderer2) {}

  onTabChange(index: number): void {
    this.activeTabIndex = index;
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
