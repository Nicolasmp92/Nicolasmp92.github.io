import { Component,
         AfterViewInit,
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
import { NgClass, NgIf } from '@angular/common';

// componentes de rutas
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomeComponent,
    AboutComponent,
    ExperienceComponent,
    SkillsComponent,
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
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('navbarNav') navbarNav!: ElementRef;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  // para generar cambios en toolbar al hacer scroll
  private header: HTMLElement | undefined;
  private changeHeaderOn: number = 100;
  private didScroll: boolean = false;
  // ---------------------------------------

  isSidenavOpen = false;
  options: FormGroup;

  constructor(
    private renderer: Renderer2,
    private _formBuilder: FormBuilder,
    private z: NgZone,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.options = this._formBuilder.group({
      fixed: false,
      bottom: 0,
      top: 0,
    });
  }

  ngOnInit(): void {
    this.header = document.querySelector('.navbar') as HTMLElement;
    window.addEventListener('scroll', () => this.onScroll());

    this.initCloseResponsiveMenuOnClick();
    this.initCloseResponsiveMenuOnClickOutside();

  }

  // Cambiando toolbar al hacer scroll
  onScroll() {
    if (!this.didScroll) {
      this.didScroll = true;
      setTimeout(() => this.scrollPage(), 250);
    }
  }
  scrollY(): number {
    return window.scrollY || document.documentElement.scrollTop;
    console.log('scrollY');
  }
  scrollPage() {
    const sy = this.scrollY();
    if (this.header) {
      if (sy >= this.changeHeaderOn) {
        this.renderer.addClass(this.header, 'scrolled');
        console.log('add scroll');
      } else {
        this.renderer.removeClass(this.header, 'scrolled');
        console.log('remove scroll');
      }
    }
    this.didScroll = false;
  }



  ngAfterViewInit(): void {
    if (this.sidenav) {
      this.isSidenavOpen = this.sidenav.opened;
    } else {
      console.error('Sidenav no está definido');
    }
  }

  ngOnDestroy() {}

  toggleSidenav(): void {
    this.sidenav.toggle().then(() => {
      this.isSidenavOpen = this.sidenav.opened;
    });
  }

  collapseMenu(): void {
    if (this.navbarNav.nativeElement.classList.contains('show')) {
      this.navbarNav.nativeElement.classList.remove('show');
    }
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
    window.location.href = url;
  }


}
