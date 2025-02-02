import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MapService } from './Service/map.service';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NgClass],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'easy_couple_life';
  headHidden = false; // head 是否隱藏

  @ViewChild('appRoot') appRoot!: ElementRef;

  constructor(private mapSrv: MapService){ }

  ngAfterViewInit() {
    this.appRoot.nativeElement.addEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll() {
    const scrollTop = this.appRoot.nativeElement.scrollTop || 0;
    const threshold = 150; // 捲動超過 100px 時隱藏 head
    this.headHidden = scrollTop > threshold;
  }
  
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const threshold = 100; // 捲動超過 100px 時隱藏 head

    this.headHidden = scrollTop > threshold;
  }
}
