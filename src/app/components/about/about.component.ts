import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    NgIf
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
