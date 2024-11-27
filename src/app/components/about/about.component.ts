import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    NgIf,
    MatIcon

  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  VerMas = false;
MostrarTexto(){
  this.VerMas = !this.VerMas;
};
}
