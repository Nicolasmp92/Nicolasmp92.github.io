import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
// import { PickerComponent } from '@ctrl/ngx-emoji-mart';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    // Rutas
    RouterLinkActive,
 // Complementos
    MatCardModule,
    MatIcon,
    MatButtonModule,
    MatCardModule,
    MatIcon,
    MatButtonModule,
    NgIf
    // PickerComponent


  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: []

})
export class HomeComponent {
  // emoji = '';
  VerMas = false;
  MostrarTexto(){
    this.VerMas = !this.VerMas;
};
}
