import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import { timeLineData } from './timelineData';
import { milestone } from './milestone';

  @Component({
  selector: 'portfolio-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  animations: [
    trigger('rotate', [
      state('right', style({transform: 'rotate(45deg)' })),
      transition('* => right',  [
        style({transform: 'rotate(0deg)'}),
        animate('2000ms cubic-bezier(0.175, 0.885, 0.32, 1.275)')
      ])
    ]),
    trigger('expand', [
      state('right', style({})),
      transition('void => *',  [
        style({ transform: 'scaleX(0)'}),
        animate(700)
      ])
    ]),
    trigger('reveal', [
      state('show', style({opacity: '1'})),
      state('hide', style({opacity: '0'})),
      transition('* => show',  [
        style({ opacity: '0'}),
        animate(2000)
      ]),
      transition('show => hide', animate('3000ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'))
    ])
  ]
})

export class TimelineComponent implements OnInit {

  timestamps: milestone[];
  done = '';
  show = '';
  description: string;
  currentIndex = 0;
  displayDescription = 'hide'

  constructor() { }

  ngOnInit() {
    let year = new Date().getFullYear().toString();
    let latestMilestone: milestone = {
      year: year,
      heading: 'Today',
      description:  `Today I feel I am a well rounded Software Developer but there are still a lot of things to learn.
      The ever changing web technologies keeps me on my toes and I don't mind that at all.`
    }
    this.timestamps = timeLineData.slice();
    this.timestamps.push(latestMilestone);
    this.description = this.timestamps[0].description;
  }
  animationDone(event) {
    this.done = 'right';
    this.show = 'show';
    this.displayDescription = 'show'; 
  }

  showDescription(e, i) {
    // this.displayDescription = 'hide';
    this.currentIndex = i;
    this.description = this.timestamps[i].description;
    // this.displayDescription = 'show'; 

  }

  descriptionToggle(e) {
    console.log(this.displayDescription);
    
  }
}
