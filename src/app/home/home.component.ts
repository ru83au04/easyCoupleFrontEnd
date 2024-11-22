import { Component } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { TimecounterComponent } from '../timecounter/timecounter.component';
import { NgIf } from '@angular/common';
import { environment } from '../../environments/environment';
 
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
  apiKey: string = environment.googleMapsApiKey;

  ngAfterViewInit(): void {
    
  }
}
