import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { trigger, style, animate, keyframes, transition } from '@angular/animations';
import { AnimationDriver } from '@angular/animations/browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgFor,

  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: []

})
export class HomeComponent {
}
