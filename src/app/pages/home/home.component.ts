import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { trigger, style, animate, keyframes, transition } from '@angular/animations';
import { AnimationDriver } from '@angular/animations/browser';
import {MatCardModule} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgFor,
    MatCardModule,
    MatIcon


  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: []

})
export class HomeComponent {
}
