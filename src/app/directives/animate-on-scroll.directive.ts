import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appAos]',
  standalone: true,
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  /** Delay in ms before the transition starts (for stagger effects) */
  @Input() aosDelay = 0;
  /** Animation variant: 'up' | 'left' | 'right' | 'fade' */
  @Input() aosDir: 'up' | 'left' | 'right' | 'fade' = 'up';

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const el = this.el.nativeElement;

    // Respect user's motion preference
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const translateMap = {
      up:    'translateY(28px)',
      left:  'translateX(-28px)',
      right: 'translateX(28px)',
      fade:  'translateY(0)',
    };

    el.style.opacity = '0';
    el.style.transform = translateMap[this.aosDir];
    el.style.transition = `opacity 0.55s ease ${this.aosDelay}ms, transform 0.55s ease ${this.aosDelay}ms`;
    el.style.willChange = 'opacity, transform';

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = '1';
            el.style.transform = 'translate(0)';
            this.observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );

    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
