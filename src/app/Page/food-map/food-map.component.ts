import { Component, Input } from '@angular/core';
import { NgIf, NgStyle } from '@angular/common';
import { GoogleMapComponent } from '../../Kennel/google-map/google-map.component';

@Component({
  selector: 'app-food-map',
  standalone: true,
  imports: [NgIf, NgStyle, GoogleMapComponent],
  templateUrl: './food-map.component.html',
  styleUrl: './food-map.component.css'
})
export class FoodMapComponent {
  loadMap: boolean = false;
  currentLocation: any;
  
  ngOnInit(){
    navigator.geolocation.getCurrentPosition((position) => {
      this.currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      this.loadMap = true;
    });
  }
}
