import { Component, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
  imports: [MatIconModule, NgClass],
})
export class FooterComponent {
  isScrollTopVisible = false;
  private readonly SCROLL_TOP_THRESHOLD = 200;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrollTopVisible = window.scrollY > this.SCROLL_TOP_THRESHOLD;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
