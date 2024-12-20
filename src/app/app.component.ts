import { Component,
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
    // Eliminar el listener al destruir el componente para evitar memory leaks
    if (this.scrollListener) {
      this.scrollListener();
    }
  }

  // Alterna el estado del sidenav (abrir/cerrar) utilizando BehaviorSubject.
  toggleSidenav(): void {
    this.sidenavState.next(!this.sidenavState.value);
  }

  // Cierra el sidenav automáticamente si se hace clic en un enlace y
  // la pantalla está en modo móvil.
  // NO FUNCIONA VERIFICAR
  closeSidenavOnLinkClick(): void {
    // Verificar si el sidenav está abierto y si la pantalla está en modo móvil
    if (window.innerWidth <= 768 && this.sidenav.opened) {
      this.sidenav.close();
      console.log('Cerrando sidenav');
    }
  }

 // Colapsa el menú de navegación en pantallas móviles si está abierto.
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
 // Realiza un desplazamiento suave hacia una sección específica de la página
  // utilizando su ID.
  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Configura eventos para cerrar automáticamente el menú de navegación
  // en pantallas móviles cuando se hace clic en un enlace del menú.
  //NO FUNCIONA VERIFICAR
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

  // Configura un evento para cerrar el menú de navegación cuando se hace clic
  // fuera de la barra de navegación en pantallas móviles.
  //NO FUNCIONA VERIFICAR
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

  // Navega a una URL abriendo el enlace en una nueva pestaña.
  navigateTo(url: string): void {
    window.open(url, '_blank');
  }

  // Agrega y remueve dinámicamente la clase 'active' a los enlaces de la barra
  // de navegación según el enlace que se haya hecho clic.
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
