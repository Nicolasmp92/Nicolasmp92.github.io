import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgIf } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

// Componentes
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ContactComponent } from './components/contact/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    ExperienceComponent,
    SkillsComponent,
    ContactComponent,
    FooterComponent,
    MatToolbarModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    NgIf,
    NgClass,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private header: HTMLElement | undefined;
  private changeHeaderOn: number = 100;
  private didScroll: boolean = false;

  title = 'Niko';

  @ViewChild('inicio', { static: false }) inicioSection!: ElementRef;
  @ViewChild('about', { static: false }) aboutSection!: ElementRef;
  @ViewChild('experiencia', { static: false }) experienciaSection!: ElementRef;
  @ViewChild('habilidades', { static: false }) habilidadesSection!: ElementRef;
  @ViewChild('contacto', { static: false }) contactoSection!: ElementRef;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isSidenavOpen = false;
  options: FormGroup;

  constructor(private renderer: Renderer2, private _formBuilder: FormBuilder) {
    this.options = this._formBuilder.group({
      fixed: false,
      bottom: 0,
      top: 0,
    });
  }

  ngOnInit(): void {
    this.header = document.querySelector('.navbar') as HTMLElement;
    window.addEventListener('scroll', () => this.onScroll());

    this.initScrollSpy();
    this.initCloseResponsiveMenuOnClick();
    this.initCloseResponsiveMenuOnClickOutside();
  }

  toggleSidenav() {
    this.sidenav.toggle();
    this.isSidenavOpen = this.sidenav.opened;
  }

  scrollToSection(section: string) {
    let element;
    switch (section) {
      case 'inicio':
        element = this.inicioSection;
        break;
      case 'about':
        element = this.aboutSection;
        break;
      case 'experiencia':
        element = this.experienciaSection;
        break;
      case 'habilidades':
        element = this.habilidadesSection;
        break;
      case 'contacto':
        element = this.contactoSection;
        break;
    }

    if (element) {
      element.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onScroll() {
    if (!this.didScroll) {
      this.didScroll = true;
      setTimeout(() => this.scrollPage(), 250);
    }
  }

  scrollPage() {
    const sy = this.scrollY();
    if (this.header) {
      if (sy >= this.changeHeaderOn) {
        this.renderer.addClass(this.header, 'navbar-shrink');
      } else {
        this.renderer.removeClass(this.header, 'navbar-shrink');
      }
    }
    this.didScroll = false;
  }

  scrollY(): number {
    return window.pageYOffset || document.documentElement.scrollTop;
  }

  smoothScroll(event: Event, target: string) {
    event.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      const yOffset = -60; // Ajusta este valor según sea necesario
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    const toggleButton = document.querySelector('.navbar-toggler');
    if (toggleButton && toggleButton.classList.contains('collapsed')) {
      (toggleButton as HTMLElement).click();
    }
  }

  initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.navbar-nav li');

    window.onscroll = () => {
      let current: string | null = '';

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
          current = section.getAttribute('id');
        }
      });

      navLi.forEach((li) => {
        li.classList.remove('active');
        if (li.querySelector('a')?.getAttribute('href') === `#${current}`) {
          li.classList.add('active');
        }
      });
    };
  }

  initCloseResponsiveMenuOnClick() {
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

  initCloseResponsiveMenuOnClickOutside() {
    document.body.addEventListener('click', (event) => {
      const nav = document.querySelector('nav');
      const toggleButton = document.querySelector('button.navbar-toggler');
      const target = event.target as HTMLElement;

      if (toggleButton && !toggleButton.classList.contains('collapsed') && !nav?.contains(target)) {
        (toggleButton as HTMLElement).click();
      }
    });
  }
}
