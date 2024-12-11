import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    NgFor,
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  VerMas = false;
 // Simulación de imágenes de Instagram
 images: string[] = [
  'https://via.placeholder.com/300x300.png?text=Foto+1',
  'https://via.placeholder.com/300x300.png?text=Foto+2',
  'https://via.placeholder.com/300x300.png?text=Foto+3',
  'https://via.placeholder.com/300x300.png?text=Foto+4',
];

  // images: string[] = [];

  MostrarTexto() {
    this.VerMas = !this.VerMas;
  }

  ngOnInit(): void {
    this.loadInstagramPhotos(); // Llamar a la función que carga imágenes
  }

  loadInstagramPhotos() {
    const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN'; // Reemplaza con tu token de Instagram
    fetch(`https://graph.instagram.com/me/media?fields=id,media_type,media_url&access_token=${ACCESS_TOKEN}`)
      .then(response => response.json())
      .then(data => {
        this.images = data.data
          .filter((item: any) => item.media_type === 'IMAGE') // Filtra solo imágenes
          .slice(0, 4) // Limita a 4 imágenes
          .map((item: any) => item.media_url); // Obtiene las URLs de las imágenes
      })
      .catch(error => console.error('Error fetching Instagram photos:', error));
  }

}
