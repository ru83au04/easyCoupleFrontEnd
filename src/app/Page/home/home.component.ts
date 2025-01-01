import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { NgIf, NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
 
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
  goToAbout = false;
  firstVisit!: boolean;

  constructor(private router: Router, private active: ActivatedRoute){}

  ngOnInit(){
    this.active.queryParams.subscribe(params => this.firstVisit = params['notFirst']);
  }

  

  @HostListener('animationend', ['$event']) animationEnd(event: AnimationEvent){
    switch(event.animationName){
      case "line-one-fade-in":
        this.oneReady = true;
        break;
      case "line-two-fade-in":
        this.twoReady = true;
        setTimeout(() => {
          if(!this.firstVisit){
            this.goToAbout = true;
            setTimeout(() => {
              this.router.navigate(['/about']);
            }, 1000);
          }
        }, 1000);
        break;
      default:
        break;
    }
  }

}
