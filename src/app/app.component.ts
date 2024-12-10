import { Component,
         AfterViewInit,
         AfterViewChecked,
         ElementRef,
         OnInit,
         ViewChild,
         Renderer2,
         NgZone,
         ChangeDetectorRef,
         OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { throttleTime, debounceTime, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    ScrollingModule,

    RouterLink,
    NgIf,
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
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild('toolbar', { static: false }) toolbar!: ElementRef;
  @ViewChild('sidenavContent', { static: false }) sidenavContent!: ElementRef;


  // Propiedades relacionadas con el scroll
  private scrollListener: (() => void) | undefined;
  private header: HTMLElement | undefined;
  private changeHeaderOn: number = 100;
  private didScroll: boolean = false;

  sidenavState = new BehaviorSubject<boolean>(false);
  isSidenavOpen = false;
  options: FormGroup;

  constructor(
    private renderer: Renderer2,
    private _formBuilder: FormBuilder,
    private z: NgZone,
    private changeDetectorRef: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver,
    private scrollDispatcher: ScrollDispatcher,
    private ngZone: NgZone
  ) {
    this.options = this._formBuilder.group({
      fixed: false,
      bottom: 0,
      top: 0,
    });
    this.sidenavState.subscribe(state => {
      this.isSidenavOpen = state;
    });
  }
  ngOnInit(): void {
    this.scrollDispatcher.scrolled()
      .pipe(
        map((event: void | CdkScrollable) => {
          if (event instanceof CdkScrollable) {
            return event.getElementRef().nativeElement.scrollTop;
          }
          return this.scrollY();
        }),
        debounceTime(100) // Reduce la sensibilidad al scroll
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
  }
  // Método para actualizar la clase de la barra
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
  scrollY(): number {
    return window.scrollY || document.documentElement.scrollTop;
  }
  ngOnDestroy(): void {
    // Eliminar el listener al destruir el componente para evitar memory leaks
    if (this.scrollListener) {
      this.scrollListener();
    }
  }
  toggleSidenav(): void {
    this.sidenavState.next(!this.sidenavState.value);
  }

  closeSidenavOnLinkClick(): void {
    // Verificar si el sidenav está abierto y si la pantalla está en modo móvil
    if (window.innerWidth <= 768 && this.sidenav.opened) {
      this.sidenav.close();
    }
  }

  collapseNavbarResponsive(): void {
    // Verificamos si estamos en una vista móvil
    if (window.innerWidth <= 768) {
      const navbar = document.querySelector('.navbar-collapse');
      if (navbar && navbar.classList.contains('show')) {
        // Remover la clase 'show' para colapsar el menú
        navbar.classList.remove('show');
      }
    }
  }

  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  initCloseResponsiveMenuOnClick(): void {
    const navLinks = document.querySelectorAll('.navbar-collapse ul li a');
    const toggleButton = document.querySelector('.navbar-toggler');

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (toggleButton && !toggleButton.classList.contains('collapsed')) {
          (toggleButton as HTMLElement).click();
        }
      });
    });
  }
  initCloseResponsiveMenuOnClickOutside(): void {
    document.body.addEventListener('click', (event) => {
      const nav = document.querySelector('nav');
      const toggleButton = document.querySelector('button.navbar-toggler');
      const target = event.target as HTMLElement;

      if (toggleButton && !toggleButton.classList.contains('collapsed') && !nav?.contains(target)) {
        (toggleButton as HTMLElement).click();
      }
    });
  }
  navigateTo(url: string): void {
    window.open(url, '_blank');
  }
  handleRouterLinkActive(): void {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.forEach((navLink) => {
          navLink.classList.remove('active');
        });
        link.classList.add('active');
      });
    });
  }
}
