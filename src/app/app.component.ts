import { Component, AfterViewInit, ElementRef, OnInit, ViewChild, Renderer2, HostListener } from '@angular/core';
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

// Componentes
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomeComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    ContactComponent,
    FooterComponent,
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
    NgIf,
    NgClass,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('navbarNav') navbarNav!: ElementRef;
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild('toolbar') toolbar!: ElementRef;
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
    this.initScrollSpy();
    this.initCloseResponsiveMenuOnClick();
    this.initCloseResponsiveMenuOnClickOutside();
  }

  ngAfterViewInit(): void {
    // Verificación para asegurar que sidenav esté inicializado
    if (this.sidenav) {
      this.isSidenavOpen = this.sidenav.opened;
      console.log('Sidenav está abierto:', this.isSidenavOpen);
    } else {
      console.error('Sidenav no está definido');
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (offset > 50) {
      this.renderer.addClass(this.toolbar.nativeElement, 'scrolled');
      this.renderer.addClass(document.querySelector('.scroll-top')!, 'show');
    } else {
      this.renderer.removeClass(this.toolbar.nativeElement, 'scrolled');
      this.renderer.removeClass(document.querySelector('.scroll-top')!, 'show');
    }
  }

  toggleSidenav(): void {
    console.log('Antes de toggle:', this.isSidenavOpen);
    this.sidenav.toggle().then(() => {
      this.isSidenavOpen = this.sidenav.opened;
      console.log('Después de toggle:', this.isSidenavOpen);
    });
  }

  collapseMenu(): void {
    if (this.navbarNav.nativeElement.classList.contains('show')) {
      this.navbarNav.nativeElement.classList.remove('show');
    }
  }

  initScrollSpy(): void {
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.navbar-nav li');

    window.addEventListener('scroll', () => {
      let current: string | null = '';

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        if (window.scrollY >= sectionTop - 60) {
          current = section.getAttribute('id');
        }
      });

      navLi.forEach((li) => {
        li.classList.remove('active');
        if (li.querySelector('a')?.getAttribute('href') === `#${current}`) {
          li.classList.add('active');
        }
      });
    });
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

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navigateTo(url: string): void {
    window.location.href = url;
  }
}
