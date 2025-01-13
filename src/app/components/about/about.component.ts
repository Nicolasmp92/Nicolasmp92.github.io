import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  @ViewChild('bubbleContainer', { static: true }) bubbleContainer!: ElementRef;

  images: string[] = [
    'img/img1.jpg',
    'img/img2.jpg',
    'img/img3.jpg',
    'img/img4.jpg',
    'img/img5.jpg',
    'img/img6.jpg',
    'img/img7.jpg',
    'img/img8.jpg',
    'img/img9.jpg',
    'img/img10.jpg',
  ]; // Rutas locales de las imágenes

  currentImage: string = this.images[0]; // Definir la imagen inicial para el enlace

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.startBubbleAnimation();
    this.startImageRotation();
  }

  // Método para cambiar imágenes en el círculo principal
  startImageRotation() {
    let index = 0;
    setInterval(() => {
      index = (index + 1) % this.images.length;
      this.currentImage = this.images[index];
    }, 3000); // Cambia cada 3 segundos
  }

  // Método para generar burbujas aleatorias
  startBubbleAnimation() {
    setInterval(() => {
      this.createFloatingBubble();
    }, 1000); // Crea una burbuja nueva cada segundo
  }

  createFloatingBubble() {
    const bubble = this.renderer.createElement('div');
    this.renderer.addClass(bubble, 'floating-bubble');

    const image = this.renderer.createElement('img');
    const randomImage = this.images[Math.floor(Math.random() * this.images.length)];
    this.renderer.setAttribute(image, 'src', randomImage);
    this.renderer.appendChild(bubble, image);

    // Generar tamaños y posiciones aleatorias
    const size = Math.random() * 4 + 2; // Tamaño entre 2rem y 6rem
    const left = Math.random() * 100; // Posición horizontal aleatoria
    const delay = Math.random() * 2; // Retraso aleatorio en la animación

    this.renderer.setStyle(bubble, 'width', `${size}rem`);
    this.renderer.setStyle(bubble, 'height', `${size}rem`);
    this.renderer.setStyle(bubble, 'left', `${left}%`);
    this.renderer.setStyle(bubble, 'animation-delay', `${delay}s`);

    // Agregar burbuja al contenedor
    this.renderer.appendChild(this.bubbleContainer.nativeElement, bubble);

    // Eliminar burbuja después de la animación
    setTimeout(() => {
      this.renderer.removeChild(this.bubbleContainer.nativeElement, bubble);
    }, 6000); // Tiempo coincide con la duración de la animación
  }
}
