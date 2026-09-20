import { Component,
         ElementRef,
         OnInit,
         ViewChild,
         Renderer2,
         NgZone,
         ChangeDetectorRef,
         HostListener,
         OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgFor, NgIf } from '@angular/common';
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
    NgIf,

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

  // Accessibility — font size scaling
  isA11yOpen = false;
  fontScale = 1;
  readonly FONT_MIN = 0.8;
  readonly FONT_MAX = 1.5;
  readonly FONT_STEP = 0.1;
  private readonly FONT_BASE = 62.5; // % — matches html { font-size: 62.5% }

  // Accessibility toggles (applied as classes on <html>)
  highContrast = false;
  easyRead = false;
  reduceMotion = false;
  underlineLinks = false;
  bigCursor = false;
  readingGuide = false;
  guideY = 0;

  private readonly a11yClasses: Record<string, string> = {
    highContrast: 'a11y-contrast',
    easyRead: 'a11y-easyread',
    reduceMotion: 'a11y-nomotion',
    underlineLinks: 'a11y-underline',
    bigCursor: 'a11y-bigcursor',
  };

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

    const saved = parseFloat(localStorage.getItem('font-scale') ?? '1');
    this.setFontScale(isNaN(saved) ? 1 : saved);

    const prefs = localStorage.getItem('a11y-prefs');
    if (prefs) {
      const parsed = JSON.parse(prefs);
      this.highContrast = !!parsed.highContrast;
      this.easyRead = !!parsed.easyRead;
      this.reduceMotion = !!parsed.reduceMotion;
      this.underlineLinks = !!parsed.underlineLinks;
      this.bigCursor = !!parsed.bigCursor;
      this.readingGuide = !!parsed.readingGuide;
    } else {
      this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    this.applyA11yClasses();
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

  // Accessibility widget
  toggleA11y(): void {
    this.isA11yOpen = !this.isA11yOpen;
  }

  increaseFont(): void {
    this.setFontScale(this.fontScale + this.FONT_STEP);
  }

  decreaseFont(): void {
    this.setFontScale(this.fontScale - this.FONT_STEP);
  }

  resetFont(): void {
    this.setFontScale(1);
  }

  get fontPercent(): number {
    return Math.round(this.fontScale * 100);
  }

  private setFontScale(value: number): void {
    this.fontScale = Math.min(this.FONT_MAX, Math.max(this.FONT_MIN, Math.round(value * 10) / 10));
    document.documentElement.style.fontSize = `${(this.FONT_BASE * this.fontScale).toFixed(3)}%`;
    localStorage.setItem('font-scale', String(this.fontScale));
  }

  toggleA11yOption(
    key: 'highContrast' | 'easyRead' | 'reduceMotion' | 'underlineLinks' | 'bigCursor' | 'readingGuide'
  ): void {
    this[key] = !this[key];
    this.applyA11yClasses();
    localStorage.setItem('a11y-prefs', JSON.stringify({
      highContrast: this.highContrast,
      easyRead: this.easyRead,
      reduceMotion: this.reduceMotion,
      underlineLinks: this.underlineLinks,
      bigCursor: this.bigCursor,
      readingGuide: this.readingGuide,
    }));
  }

  private applyA11yClasses(): void {
    for (const [key, cls] of Object.entries(this.a11yClasses)) {
      document.documentElement.classList.toggle(cls, (this as any)[key]);
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.readingGuide) {
      this.guideY = event.clientY;
    }
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
