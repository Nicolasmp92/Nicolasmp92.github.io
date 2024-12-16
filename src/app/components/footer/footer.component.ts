import { Component, HostListener, NgZone, OnDestroy, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/scrolling';
import { NgClass, NgStyle } from '@angular/common';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
  imports: [
    MatIconModule,
    NgClass,
    NgStyle,
  ],
})
export class FooterComponent implements OnDestroy {
  isFooterVisible: boolean = false; // Estado inicial del footer
  private scrollSubscription: Subscription;
  isScrollTopVisible: boolean = false; // Estado inicial del botón Scroll to Top
  selectedHour: number = new Date().getHours(); // Hora inicial
  backgroundColor: string = '#FFFFFF'; // Color inicial del circuito circadiano

  private readonly SCROLL_TOP_THRESHOLD = 200; // Distancia de scroll para mostrar el botón

  constructor(
    private ngZone: NgZone,
    private scrollDispatcher: ScrollDispatcher,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.updateBackgroundColor(this.selectedHour); // Actualiza el color de fondo según la hora actual

    // Suscripción al evento de scroll para detectar desplazamientos
    this.scrollSubscription = this.scrollDispatcher
      .scrolled(200) // Throttle opcional para mejor rendimiento
      .subscribe((event: CdkScrollable | void) => {
        this.ngZone.run(() => {
          this.handleScrollEvent(event);
        });
      });
  }

  /**
   * Maneja el evento de scroll y actualiza la visibilidad del botón Scroll to Top.
   * @param event Evento de scroll detectado.
   */
  private handleScrollEvent(event: CdkScrollable | void): void {
    let scrollTop = 0;
    if (event) {
      const element = event.getElementRef().nativeElement; // Obtiene el contenedor asociado al evento
      scrollTop = element.scrollTop;
    } else {
      scrollTop =
        this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    }
    this.isScrollTopVisible = scrollTop > this.SCROLL_TOP_THRESHOLD; // Actualiza visibilidad del botón
  }

  /**
   * Maneja el cambio en el control deslizante de la hora.
   * @param event Evento del deslizador.
   */
  onSliderChange(event: any): void {
    this.selectedHour = +event.target.value; // Actualiza la hora seleccionada
    this.updateBackgroundColor(this.selectedHour); // Actualiza el color de fondo
  }

  /**
   * Actualiza el color de fondo según la hora seleccionada.
   * @param hour Hora actual o seleccionada.
   */
  updateBackgroundColor(hour: number): void {
    if (hour >= 5 && hour < 8) {
      this.backgroundColor = '#028391'; // Amanecer
    } else if (hour >= 8 && hour < 18) {
      this.backgroundColor = '#F6DCAC'; // Día
    } else if (hour >= 18 && hour < 20) {
      this.backgroundColor = '#FEAE6F'; // Atardecer
    } else {
      this.backgroundColor = '#2E2E2E'; // Noche
    }
  }

  /**
   * Alterna la visibilidad del footer.
   */
  toggleFooter(): void {
    this.isFooterVisible = !this.isFooterVisible; // Alterna el estado de visibilidad
  }

  /**
   * Desplaza la página hacia arriba suavemente.
   */
  scrollToTop(): void {
    const sidenavContent = this.document.getElementById('sidenav-content');
    if (sidenavContent) {
      sidenavContent.scrollTo({ top: 0, behavior: 'smooth' }); // Desplazamiento en contenedor específico
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Desplazamiento global
    }
  }

  /**
   * Limpia la suscripción al destruir el componente para evitar memory leaks.
   */
  ngOnDestroy(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe(); // Cancela la suscripción al evento de scroll
    }
  }
}
