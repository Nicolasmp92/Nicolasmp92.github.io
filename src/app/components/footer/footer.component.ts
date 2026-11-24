import { Component, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
  imports: [MatIconModule, NgClass, NgFor],
})
export class FooterComponent {
  isScrollTopVisible = false;
  private readonly SCROLL_TOP_THRESHOLD = 200;

  year = new Date().getFullYear();

  socials = [
    {
      name: 'LinkedIn',
      icon: 'bi-linkedin',
      url: 'https://www.linkedin.com/in/nicolas-mu%C3%B1oz-2551b8b6/',
    },
    {
      name: 'GitHub',
      icon: 'bi-github',
      url: 'https://github.com/Nicolasmp92',
    },
    {
      name: 'Instagram',
      icon: 'bi-instagram',
      url: 'https://www.instagram.com/nikolas.munozpalacios/',
    },
    {
      name: 'Facebook',
      icon: 'bi-facebook',
      url: 'https://www.facebook.com/nikolas.munozpalacios/',
    },
    {
      name: 'Linktree',
      icon: 'bi-link-45deg',
      url: 'https://linktr.ee/NikoMP',
    },
  ];

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrollTopVisible = window.scrollY > this.SCROLL_TOP_THRESHOLD;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
