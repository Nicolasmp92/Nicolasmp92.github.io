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
import { fromEvent } from 'rxjs';
import { throttleTime, map } from 'rxjs/operators';
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
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
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
    // Suscribirse a los eventos de scroll utilizando el ScrollDispatcher
    this.scrollDispatcher.scrolled()
      .pipe(
        map((event: void | CdkScrollable) => {
          if (event instanceof CdkScrollable) {
            return event.getElementRef().nativeElement.scrollTop;
          }
          return 0;
        })
      )
      .subscribe((scrollTop: number) => {
        // Utilizamos NgZone para ejecutar el cambio dentro de Angular
        this.ngZone.run(() => {
          this.shrinkToolbar = scrollTop > this.SHRINK_TOP_SCROLL_POSITION;
        });
      });
  }


  onScroll() {
    if (!this.didScroll) {
      this.didScroll = true;
      setTimeout(() => this.scrollPage(), 250);
    }
  }

  scrollY(): number {
    return window.scrollY || document.documentElement.scrollTop;
  }

  scrollPage() {
    if (!this.toolbar || !this.sidenavContent || !this.sidenavContent.nativeElement) return;

    const sy = this.sidenavContent.nativeElement.scrollTop;
    if (sy >= this.changeHeaderOn) {
      // Cambiar la altura y hacer la barra transparente
      this.renderer.addClass(this.toolbar.nativeElement, 'scrolled');
    } else {
      // Volver al estilo original cuando sube
      this.renderer.removeClass(this.toolbar.nativeElement, 'scrolled');
    }
  }

  ngAfterViewInit(): void {
    if (this.sidenavContent && this.sidenavContent.nativeElement) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.renderer.removeClass(this.toolbar.nativeElement, 'scrolled');
            } else {
              this.renderer.addClass(this.toolbar.nativeElement, 'scrolled');
            }
          });
        },
        { threshold: [0, 1] } // Ajusta según lo necesario.
      );

      observer.observe(this.sidenavContent.nativeElement);
    } else {
      console.error('sidenavContent no está disponible en ngAfterViewInit');
    }
  }


  ngOnDestroy(): void {
    // Eliminar el listener al destruir el componente para evitar memory leaks
    if (this.scrollListener) {
      this.scrollListener();
    }
  }

  toggleSidenav() {
    const currentState = this.sidenavState.value;
    this.sidenavState.next(!currentState); // Cambia el estado.
  }

  collapseMenu(): void {
    if (this.navbarNav.nativeElement.classList.contains('show')) {
      this.navbarNav.nativeElement.classList.remove('show');
    }
  }

  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Aplicar los mismos cambios al navegar a una sección
      setTimeout(() => {
        this.scrollPage(); // Llamamos para aplicar los estilos después de que la animación termine.
      }, 300);
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
