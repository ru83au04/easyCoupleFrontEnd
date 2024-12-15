import { Component } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { TimecounterComponent } from '../../Kennel/timecounter/timecounter.component';
import { NgIf } from '@angular/common';
 
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, GoogleMap, MapMarker, TimecounterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  center: any = null;
  zoom: number = 15;
  getLoc: boolean = true;

  ngAfterViewInit(): void {
    
  }
}
