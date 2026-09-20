import { Component, TemplateRef, ViewChild, Renderer2,ViewEncapsulation  } from '@angular/core';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
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
    title: 'MP Ingeniería',
    description: 'Ingeniería, construcción y asesoría integral.',
    estado: 'Finalizada 2026',
    Link: 'https://ingenieriamp.cl/',
    image: 'img/header_mp.png',
    fullimage: 'img/ingenieriamp.cl_.png',
    tags: ['Angular', 'Bootstrap', 'HTML5', 'CSS3', 'TypeScript'],
    seoTags: [
      'ingeniería',
      'construcción',
      'obras civiles',
      'estudios de suelo',
      'arriendo de equipos',
      'Rancagua',
      'región de O\'Higgins',
      'mp ingeniería'
    ],
    details: `
      <p>Sitio web corporativo para MP Ensayos y Construcciones Ltda., empresa de ingeniería, construcción y asesoría con más de 5 años de trayectoria en la región de O'Higgins.</p>
      <ul>
        <li>Hero con indicadores destacados de la empresa.</li>
        <li>Secciones de misión, visión y valores corporativos.</li>
        <li>Catálogo de servicios: obras civiles, arriendo de equipos y estudios de suelo.</li>
        <li>Red de colaboradores y empresas asociadas.</li>
        <li>Modo claro/oscuro y diseño totalmente responsivo.</li>
      </ul>
    `,
  },
  {
    title: 'RECOS Group',
    description: 'Constructora, ventas y climatización.',
    estado: 'En Desarrollo',
    image: 'img/Recos.png',
    fullimage: 'img/Recos.png',
    gallery: ['img/Recos1.png', 'img/Recos2.png', 'img/Recos3.png'],
    tags: ['Angular', 'TypeScript', 'HTML5', 'CSS3', 'i18n'],
    seoTags: [
      'construcción',
      'obras civiles',
      'climatización',
      'HVAC',
      'ventas de materiales',
      'equipamiento',
      'recos group',
      'constructora en Chile'
    ],
    details: `
      <p>Plataforma corporativa de RECOS Group: "un solo grupo, tres ejes de servicio". Sitio multi-división con selector de idioma, modo claro/oscuro y buscador integrado.</p>
      <ul>
        <li>Landing principal con acceso a las tres divisiones del grupo.</li>
        <li><strong>Constructora:</strong> construcción y obras civiles; habilitación ágil de espacios comerciales y corporativos con cobertura de Antofagasta a Aysén.</li>
        <li><strong>Ventas:</strong> división comercial de materiales, equipamiento y soluciones, con cotizaciones y despacho a regiones.</li>
        <li><strong>Climatización (HVAC):</strong> diseño, instalación y mantención de sistemas de climatización como servicio integral, sin subcontratos externos.</li>
        <li>Selector de idioma, alternancia de tema claro/oscuro y buscador.</li>
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
    fullimage: 'img/Agrofull.png',
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
      position: 'Coordinador de Infraestructura de Información Científica',
      institution: "Universidad de O'Higgins — Unidad de Bibliotecas",
      date: '2026 – Actualidad',
      description:
        'Responsable del desarrollo, implementación y mantenimiento de la infraestructura tecnológica que soporta los sistemas de información científica y ciencia abierta de la universidad.',
      tasks: [
        'Diseño y administración de servidores, bases de datos y sistemas que soportan las plataformas de información científica.',
        'Desarrollo y mantenimiento de plataformas de acceso abierto para publicaciones científicas (DSpace, Dataverse, VIVO).',
        'Implementación de interfaces de integración entre repositorios y sistemas institucionales, incluyendo identificadores ORCID y DOI.',
        'Aseguramiento del cumplimiento de estándares internacionales como el protocolo OAI-PMH y políticas de preservación digital.',
      ],
    },
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
        name: 'MP Ingeniería',
        service: 'Sitio web corporativo en Angular',
      },
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
