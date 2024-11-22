import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
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
    // PickerComponent


  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: []

})
export class HomeComponent {
  // emoji = '';
}
