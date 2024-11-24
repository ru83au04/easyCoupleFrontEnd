import { Component } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-food-map',
  standalone: true,
  imports: [GoogleMap, NgIf],
  templateUrl: './food-map.component.html',
  styleUrl: './food-map.component.css'
})
export class FoodMapComponent {
  loadMap: boolean = false;
  currentLocation: any;

  constructor (private route: ActivatedRoute){}
  
  ngOnInit(){
    this.currentLocation = {
      lat: parseFloat(this.route.snapshot.paramMap.get('lat') || '0'),
      lng: parseFloat(this.route.snapshot.paramMap.get('lng') || '0'),
    }
    // navigator.geolocation.getCurrentPosition((position) => {
    //   this.currentLocation = {
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude
    //   }
    //   console.log('currentLoca', this.currentLocation);
    // }, (err) => {
    //   console.log("error get location", err);
    // });
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.loadMap = true;
    }, 1000);
  }
}
