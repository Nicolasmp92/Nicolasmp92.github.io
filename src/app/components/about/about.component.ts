import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
    imports: [
      NgFor,
    ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  images: string[] = []; // Aquí almacenaremos varias URLs de imágenes.

  ngOnInit() {
    this.fetchInstagramPhotos();
  }

  fetchInstagramPhotos() {
    const ACCESS_TOKEN = 'IGAANAZBwtGdrtBZAE0tT1ZASRFpQOXl4NTBBeW1fVEhYbU0tazVtM3V4eVp0aUtrZAHRKVWZA6cHllbUJCNy1IeVNBSFZAGVDhfV09ndk5hX1ZAZAYW5uQ25YRXNkUWtJNkt3ZADZAfMFNzY2ViY1IzS09jYkJHT1FRR2VHZA3E4dGE0bDZAZAMAZDZD'; // Reemplaza con tu token de Instagram
    const url = `https://graph.instagram.com/me/media?fields=id,media_type,media_url&access_token=${ACCESS_TOKEN}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.images = data.data
          .filter((item: any) => item.media_type === 'IMAGE') // Filtrar solo imágenes.
          .map((item: any) => item.media_url); // Obtener las URLs de las imágenes.
      })
      .catch((error) => console.error('Error fetching Instagram photos:', error));
  }
}

