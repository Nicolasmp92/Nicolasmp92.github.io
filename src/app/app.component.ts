import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
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
    NgIf,NgClass
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Niko';


  // Referencia al sidenav
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isSidenavOpen = true; // Estado inicial del sidenav
  options: any;

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
