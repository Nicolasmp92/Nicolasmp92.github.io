import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _theme = new BehaviorSubject<Theme>(this.savedTheme());
  readonly theme$ = this._theme.asObservable();

  constructor() {
    this.apply(this._theme.value);
  }

  get isDark(): boolean {
    return this._theme.value === 'dark';
  }

  toggle(): void {
    const next: Theme = this._theme.value === 'dark' ? 'light' : 'dark';
    this._theme.next(next);
    localStorage.setItem('theme', next);
    this.apply(next);
  }

  private apply(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
  }

  private savedTheme(): Theme {
    return (localStorage.getItem('theme') as Theme) ?? 'dark';
  }
}
