import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
  imports: [MatIconModule]
})
export class FooterComponent {
  scrollToTop() {
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // Ajusta la velocidad del desplazamiento
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16); // Ajusta el intervalo de tiempo para un desplazamiento más suave
  }
}
