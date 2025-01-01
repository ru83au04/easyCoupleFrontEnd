import { Component, HostListener, ViewEncapsulation  } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { NgIf, NgClass } from '@angular/common';
 
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgClass, GoogleMap, MapMarker],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None  // 禁用樣式封裝
})
export class HomeComponent {
  oneReady = false;
  twoReady = false;

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
