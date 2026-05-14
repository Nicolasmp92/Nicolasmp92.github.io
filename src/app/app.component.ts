import { Component,
         ElementRef,
         OnInit,
         ViewChild,
         Renderer2,
         NgZone,
         ChangeDetectorRef,
         OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgFor } from '@angular/common';
import { throttleTime, debounceTime, map } from 'rxjs/operators';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/scrolling';


// Importación de BreakpointObserver para manejo de diseño responsivo
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

// Importación de componentes de rutas
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterLink } from '@angular/router';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    ScrollingModule,

    RouterLink,
    NgFor,
    NgClass,

    // Componentes importados
    HomeComponent,
    AboutComponent,
    ExperienceComponent,
    SkillsComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly SHRINK_TOP_SCROLL_POSITION = 50;
  shrinkToolbar = false;

  navigationLinks = [
    { path: '/home', label: 'Inicio', section: 'home' },
    { path: '/about', label: 'Sobre mí', section: 'about' },
    { path: '/experiencia', label: 'Experiencia', section: 'experiencia' },
    { path: '/skills', label: 'Habilidades', section: 'skills' },
    { path: '/contact', label: 'Contacto', section: 'contact' }
  ];

  @ViewChild('navbarNav') navbarNav!: ElementRef;
  @ViewChild('toolbar', { static: false }) toolbar!: ElementRef;
  @ViewChild('sidenavContent', { static: false }) sidenavContent!: ElementRef;


  // Propiedades relacionadas con el scroll
  private scrollListener: (() => void) | undefined;
  private header: HTMLElement | undefined;
  private changeHeaderOn: number = 100;
  private didScroll: boolean = false;

  isContactCardOpen = false;
  activeSection = 'home';
  private sectionObserver?: IntersectionObserver;

  constructor(
    public themeService: ThemeService,
    private renderer: Renderer2,
    private z: NgZone,
    private changeDetectorRef: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver,
    private scrollDispatcher: ScrollDispatcher,
    private ngZone: NgZone
  ) {}
   // Se suscribe al evento de scroll utilizando ScrollDispatcher para detectar
  // cambios en la posición de desplazamiento. Aplica una lógica de debounce para
  // reducir la frecuencia de actualizaciones. Cambia la clase de la barra
  // de navegación según la posición del scroll.
  ngOnInit(): void {
    this.scrollDispatcher.scrolled()
      .pipe(
        map((event: void | CdkScrollable) => {
          if (event instanceof CdkScrollable) {
            return event.getElementRef().nativeElement.scrollTop;
          }
          return this.scrollY();
        }),
        debounceTime(100)
      )
      .subscribe((scrollTop: number) => {
        this.ngZone.run(() => {
          const shouldShrink = scrollTop > this.SHRINK_TOP_SCROLL_POSITION;
          if (this.shrinkToolbar !== shouldShrink) {
            this.shrinkToolbar = shouldShrink;
            this.updateNavbarClass();
          }
        });
      });
    setTimeout(() => this.initSectionObserver(), 0);
  }
 // Actualiza las clases de la barra de navegación para aplicar o quitar la clase 'shrink',
  // lo que permite cambiar su apariencia visual según el desplazamiento de la página.
  updateNavbarClass(): void {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (this.shrinkToolbar) {
        navbar.classList.add('shrink');
      } else {
        navbar.classList.remove('shrink');
      }
    }
  }

  // Retorna la posición actual de desplazamiento en el eje Y (scroll vertical).
  scrollY(): number {
    return window.scrollY || document.documentElement.scrollTop;
  }

  // Elimina el listener de scroll cuando el componente se destruye
  // para evitar problemas de rendimiento o memory leaks.
  ngOnDestroy(): void {
    if (this.scrollListener) {
      this.scrollListener();
    }
    this.sectionObserver?.disconnect();
  }

  private initSectionObserver(): void {
    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.ngZone.run(() => { this.activeSection = entry.target.id; });
          }
        });
      },
      { root: null, rootMargin: '-30% 0px -30% 0px', threshold: 0 }
    );
    this.navigationLinks.forEach(link => {
      const el = document.getElementById(link.section);
      if (el) this.sectionObserver!.observe(el);
    });
  }

  toggleContactCard(): void {
    this.isContactCardOpen = !this.isContactCardOpen;
  }

  // Colapsa el menú de navegación en pantallas móviles si está abierto.
  collapseNavbarResponsive(): void {
    if (window.innerWidth <= 992) {
      const navbar = document.querySelector('.navbar-collapse');
      if (navbar && navbar.classList.contains('show')) {
        navbar.classList.remove('show');
      }
    }
  }
 // Realiza un desplazamiento suave hacia una sección específica de la página
  // utilizando su ID.
  scrollToSection(sectionId: string): void {
    this.activeSection = sectionId;
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Navega a una URL abriendo el enlace en una nueva pestaña.
  navigateTo(url: string): void {
    window.open(url, '_blank');
  }

}
