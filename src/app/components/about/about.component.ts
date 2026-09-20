import { Component } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgClass, NgFor, MatIconModule, AnimateOnScrollDirective],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  socials = [
    {
      name: 'LinkedIn',
      handle: 'Nicolás Muñoz',
      icon: 'bi-linkedin',
      url: 'https://www.linkedin.com/in/nicolas-mu%C3%B1oz-2551b8b6/',
    },
    {
      name: 'GitHub',
      handle: '@Nicolasmp92',
      icon: 'bi-github',
      url: 'https://github.com/Nicolasmp92',
    },
    {
      name: 'Instagram',
      handle: '@nikolas.munozpalacios',
      icon: 'bi-instagram',
      url: 'https://www.instagram.com/nikolas.munozpalacios/',
    },
    {
      name: 'Facebook',
      handle: 'nikolas.munozpalacios',
      icon: 'bi-facebook',
      url: 'https://www.facebook.com/nikolas.munozpalacios/',
    },
    {
      name: 'Linktree',
      handle: '@NikoMP',
      icon: 'bi-link-45deg',
      url: 'https://linktr.ee/NikoMP',
    },
  ];
}
