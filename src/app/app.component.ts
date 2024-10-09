import { Component, ChangeDetectionStrategy, inject, OnInit, viewChild, ElementRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RouterOutlet } from '@angular/router';

// Páginas
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

// Componentes de Angular Material
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule, MatSidenav} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { ViewChild } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ContactComponent } from './components/contact/contact.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // Rutas
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    // Páginas
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    ExperienceComponent,
    SkillsComponent,
    ContactComponent,
    FooterComponent,
    // Complementos
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
    NgIf,NgClass,


  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Niko';


  @ViewChild('inicio', { static: false }) inicioSection!: ElementRef;
  @ViewChild('about', { static: false }) aboutSection!: ElementRef;
  @ViewChild('experiencia', { static: false }) experienciaSection!: ElementRef;
  @ViewChild('habilidades', { static: false }) habilidadesSection!: ElementRef;
  @ViewChild('contacto', { static: false }) contactoSection!: ElementRef;

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


  // Referencia al sidenav
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isSidenavOpen = true; // Estado inicial del sidenav, en este caso inicia cerrada
  options: any;//podria ser boolea

  constructor(private _formBuilder: FormBuilder) {
    this.options = this._formBuilder.group({
      bottom: 0,
      fixed: true,
      top: 0,
    });
  }

  toggleSidenav() {
    this.sidenav.toggle();
    this.isSidenavOpen = this.sidenav.opened;
  }
}
