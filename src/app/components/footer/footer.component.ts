import { Component, NgZone, OnDestroy, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/scrolling';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
  imports: [MatIconModule, NgClass],
})
export class FooterComponent implements OnDestroy {
  isScrollTopVisible = false;
  private readonly SCROLL_TOP_THRESHOLD = 200;
  private scrollSubscription: Subscription;

  constructor(
    private ngZone: NgZone,
    private scrollDispatcher: ScrollDispatcher,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.scrollSubscription = this.scrollDispatcher
      .scrolled(100)
      .subscribe((event: CdkScrollable | void) => {
        this.ngZone.run(() => {
          let scrollTop = 0;
          if (event) {
            scrollTop = event.getElementRef().nativeElement.scrollTop;
          } else {
            scrollTop = this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
          }
          this.isScrollTopVisible = scrollTop > this.SCROLL_TOP_THRESHOLD;
        });
      });
  }

  scrollToTop(): void {
    const sidenavContent = this.document.getElementById('sidenav-content');
    if (sidenavContent) {
      sidenavContent.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  ngOnDestroy(): void {
    this.scrollSubscription?.unsubscribe();
  }
}
