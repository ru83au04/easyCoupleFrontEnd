import { Component } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { MapService } from '../../Service/map.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-google-map',
  standalone: true,
  imports: [GoogleMap, MapMarker],
  templateUrl: './google-map.component.html',
  styleUrl: './google-map.component.css'
})
export class GoogleMapComponent {
  apiLoaded: boolean = false;

  constructor(private googleMapService: MapService){}

  ngOnInit(): void{
    this.googleMapService.loadGoogleMapsApi(environment.googleMapsApiKey)
    .then(() => this.apiLoaded = true)
    .catch(() => console.error('Google Maps 加載失敗'));
  }
}
