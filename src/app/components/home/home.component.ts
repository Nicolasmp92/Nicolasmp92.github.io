import { Component, ViewEncapsulation } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
// import { PickerComponent } from '@ctrl/ngx-emoji-mart';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    AnimateOnScrollDirective,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: []

})
export class HomeComponent {

  VerMas = false;

  MostrarTexto(){
    this.VerMas = !this.VerMas;
};
}
