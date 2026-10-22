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
    title: 'CABID',
    description: 'Sitio institucional del CRUCH: contenido, calendario de eventos y panel de administración.',
    estado: 'En Desarrollo',
    image: 'img/cabid-home.png',
    fullimage: 'img/cabid-home.png',
    gallery: [
      'img/cabid-home.png',
      'img/cabid-eventos.png',
      'img/cabid-admin-eventos.png',
      'img/cabid-admin-form.png',
    ],
    tags: ['Angular', 'Spring Boot', 'PostgreSQL', 'Tailwind CSS', 'SSR'],
    seoTags: [
      'sitio institucional',
      'bibliotecas universitarias',
      'cruch',
      'calendario de eventos',
      'panel de administración',
      'angular ssr',
      'cabid'
    ],
    details: `
      <p>Reconstrucción completa del sitio institucional de la Comisión Asesora de Bibliotecas y Documentación (CABID) del CRUCH: sitio público con SSR más panel de administración autenticado.</p>
      <ul>
        <li><strong>Sitio público:</strong> noticias, calendario mensual de eventos con detalle en modal, mapa de la red de bibliotecas, subcomisiones y sección Quiénes somos.</li>
        <li><strong>Panel admin:</strong> CRUD de noticias y eventos con validación, subida de imágenes al servidor y enlaces externos tipados (inscripción, más información, sitio del evento).</li>
        <li><strong>Backend:</strong> Spring Boot + PostgreSQL con JWT en cookie httpOnly, subida de archivos con nombres UUID y límites de tamaño.</li>
        <li><strong>Frontend:</strong> Angular 22 SSR prerenderizado detrás de Nginx, modo vista previa sin backend y accesibilidad WCAG.</li>
      </ul>
    `,
  },
  {
    title: 'BeanFlow',
    description: 'POS para cafetería: salón, comandas, barra y bodega.',
    estado: 'En Desarrollo',
    Link: 'https://github.com/Nicolasmp92/BeanFlow',
    image: 'img/beanflow-salon.png',
    fullimage: 'img/beanflow-dashboard.png',
    gallery: [
      'img/beanflow-salon.png',
      'img/beanflow-barra.png',
      'img/beanflow-bodega.png',
      'img/beanflow-carta.png',
    ],
    tags: ['Angular', 'Spring Boot', 'PostgreSQL', 'Tailwind CSS', 'TypeScript'],
    seoTags: [
      'pos cafetería',
      'punto de venta',
      'comandas',
      'gestión de mesas',
      'control de inventario',
      'recetas e insumos',
      'angular spring boot',
      'beanflow'
    ],
    details: `
      <p>Sistema de punto de venta para cafetería construido sobre el stack empresarial propio: Angular + Spring Boot + PostgreSQL, con autenticación JWT y roles (garzón, cocina, caja, admin).</p>
      <ul>
        <li><strong>Salón:</strong> mapa de mesas con estados en vivo, apertura de cuentas y pedidos para llevar.</li>
        <li><strong>Comandas:</strong> agregar ítems con notas, seguir estados de preparación y cobrar con método de pago.</li>
        <li><strong>Barra:</strong> cola de cocina con estados pendiente → preparando → listo.</li>
        <li><strong>Bodega:</strong> recetas por producto — al preparar un ítem se descuenta el insumo exacto (café, leche, vasos) con libro de movimientos auditable.</li>
        <li><strong>Carta:</strong> disponibilidad derivada del stock real de insumos.</li>
      </ul>
    `,
  },
  {
    title: 'KaiPetPoint',
    description: 'POS multi-sucursal para petshop: ventas, ofertas mayoristas, despacho a domicilio y fiado.',
    estado: 'En Desarrollo',
    Link: 'https://github.com/Nicolasmp92/kaipetpoint',
    image: 'img/kaipetpoint-pos.png',
    fullimage: 'img/kaipetpoint-dashboard.png',
    gallery: [
      'img/kaipetpoint-pos.png',
      'img/kaipetpoint-caja.png',
      'img/kaipetpoint-catalogo.png',
      'img/kaipetpoint-clientes.png',
    ],
    tags: ['Angular', 'Spring Boot', 'PostgreSQL', 'Tailwind CSS', 'OpenStreetMap'],
    seoTags: [
      'pos petshop',
      'punto de venta multi-sucursal',
      'control de caja',
      'cuenta corriente clientes',
      'lector de código de barras',
      'venta a granel',
      'ofertas por cantidad',
      'precio mayorista',
      'despacho a domicilio',
      'zonas de reparto',
      'boleta electrónica',
      'calendario de ventas',
      'reportes csv',
      'kaipetpoint'
    ],
    details: `
      <p>Punto de venta completo para tienda de mascotas con operación multi-sucursal, turnos de caja obligatorios y cuenta corriente de clientes. El servidor es autoridad de precios, stock y pagos — el POS solo previsualiza.</p>
      <ul>
        <li><strong>Ventas:</strong> POS con búsqueda, escáner USB/cámara/teléfono remoto, venta a granel por kg, descuentos y cobro combinado (venta + abono a deuda en una operación).</li>
        <li><strong>Ofertas:</strong> precio por cantidad con escalones (≥5 un. → precio mayorista, también por kg a granel), administrables por sucursal.</li>
        <li><strong>Despacho a domicilio:</strong> entrega ligada a la venta con tablero pendiente → en reparto → entregado, zonas de cobro por lejanía definidas por el admin, mapa con OpenStreetMap/Nominatim y navegación por Google Maps.</li>
        <li><strong>Clientes:</strong> cuenta corriente (fiado) con abonos, RUT validado con módulo 11, agrupación alfabética y filtro "con deuda".</li>
        <li><strong>Boleta electrónica:</strong> emisión por venta con proveedor simulado, cola de reintentos y bandeja de documentos.</li>
        <li><strong>Historial:</strong> calendario mensual con filtros por día y medio de pago, gráfico semanal en el panel que navega al día, y reportes CSV descargables (ventas, catálogo, movimientos).</li>
        <li><strong>Caja:</strong> turnos con fondo inicial, arqueo por medio de pago y cierre.</li>
        <li><strong>Catálogo:</strong> productos, marcas, categorías y mascotas con stock por sucursal y alertas de bajo mínimo.</li>
      </ul>
    `,
  },
  {
    title: 'StarterCustomeKit',
    description: 'Kit base empresarial reusable: auth, usuarios, roles y tema.',
    estado: 'En Desarrollo',
    image: 'img/sck-usuarios.png',
    fullimage: 'img/sck-dashboard.png',
    gallery: [
      'img/sck-usuarios.png',
      'img/sck-items.png',
      'img/sck-perfil.png',
    ],
    tags: ['Angular', 'Spring Boot', 'PostgreSQL', 'Tailwind CSS', 'Design Tokens'],
    seoTags: [
      'starter kit',
      'plantilla empresarial',
      'autenticación jwt',
      'roles y permisos',
      'sistema de diseño',
      'tokens de tema',
      'angular boilerplate'
    ],
    details: `
      <p>Kit de inicio propio que unifica el stack y el sistema de diseño de todos los proyectos: un cambio en los tokens se propaga a cada aplicación derivada.</p>
      <ul>
        <li>Autenticación JWT con cookies httpOnly (web) y Bearer (móvil), roles y guards.</li>
        <li>Sistema de diálogos modales sobre Angular CDK con iconos semánticos por tipo de acción.</li>
        <li>Tokens de tema con paletas de acento intercambiables y modo claro/oscuro.</li>
        <li>Base de BeanFlow, KaiPetPoint y Frunexis — homogeneidad visual y de comportamiento.</li>
      </ul>
    `,
  },
  {
    title: 'Frunexis',
    description: 'Gestión agrícola: trabajadores, contratos, especies y temporadas.',
    estado: 'En Desarrollo',
    image: 'img/frunexis-trabajadores.png',
    fullimage: 'img/frunexis-dashboard.png',
    gallery: [
      'img/frunexis-trabajadores.png',
      'img/frunexis-contratos.png',
      'img/frunexis-especies.png',
    ],
    tags: ['Angular', 'Spring Boot', 'PostgreSQL', 'Tailwind CSS'],
    seoTags: [
      'gestión agrícola',
      'trabajadores de temporada',
      'contratos',
      'especies y variedades',
      'software campo',
      'frunexis'
    ],
    details: `
      <p>Sistema de gestión para operación agrícola: dotación, contratos por temporada y catálogo de especies.</p>
      <ul>
        <li><strong>Personal:</strong> trabajadores con datos contractuales y estado activo.</li>
        <li><strong>Contratos:</strong> vínculos por temporada con fechas y condiciones.</li>
        <li><strong>Catálogo:</strong> especies, familias y temporadas de cosecha.</li>
        <li>Mismo stack empresarial: JWT, roles, diálogos modales y tokens de tema compartidos.</li>
      </ul>
    `,
  },
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
    description: 'Diseño y construcción de soluciones web a medida: desde aplicaciones empresariales completas hasta sitios corporativos, cubriendo el ciclo completo desde el levantamiento de requerimientos hasta el despliegue en producción.',
    tasks: [
      'Desarrollo full stack con Angular (SPA y SSR), Spring Boot, Laravel/Livewire y PostgreSQL.',
      'Construcción de sistemas de gestión y punto de venta: control de caja, inventario, facturación electrónica y despacho a domicilio.',
      'Implementación de autenticación JWT con cookies httpOnly, roles de usuario y paneles de administración.',
      'Sitios institucionales y corporativos con SSR, modo claro/oscuro, i18n y accesibilidad.',
      'Despliegue en servidores Linux con Nginx: dominios, SSL y prerenderizado.',
      'Sistema de diseño propio basado en tokens, compartido entre todos los proyectos para consistencia visual.',
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
