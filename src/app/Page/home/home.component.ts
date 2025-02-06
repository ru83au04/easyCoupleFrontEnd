import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TimecounterComponent } from '../../Kennel/timecounter/timecounter.component';
 
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ NgClass, TimecounterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None  // 禁用樣式封裝
})
export class HomeComponent {
  oneReady = false;
  twoReady = false;
  goToAbout = false;
  learningTime = { title: "學習 Coding累計至今", targetDate: new Date('2023/01/01'), plus: true }
  careerTime = { title: "從事前端工作累計至今", targetDate: new Date('2024/04/08'), plus: true }

  constructor(private router: Router, private active: ActivatedRoute){}

  ngOnInit(){}

  @HostListener('animationend', ['$event']) animationEnd(event: AnimationEvent){
    switch(event.animationName){
      case "line-one-fade-in":
        this.oneReady = true;
        break;
      case "line-two-fade-in":
        this.twoReady = true;
        break;
      default:
        break;
    }
  }
}
