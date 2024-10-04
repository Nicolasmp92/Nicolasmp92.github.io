import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { trigger, style, animate, keyframes, transition } from '@angular/animations';
import { AnimationDriver } from '@angular/animations/browser';
import {MatCardModule} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    // Rutas
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
 // Complementos
    NgFor,
    MatCardModule,
    MatIcon,
    MatButtonModule


  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: []

})
export class HomeComponent {
}
