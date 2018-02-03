import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'portfolio-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({opacity: '1'})),
      transition('void => in', [
        animate(300)
      ])
    ])
  ]
})
export class AppComponent implements OnInit {

  activeComponent = 'timeline';

  ngOnInit(): void {
  }

  onSwitch(component: string) {
    this.activeComponent = component;
  }
  title = 'portfolio';
}
