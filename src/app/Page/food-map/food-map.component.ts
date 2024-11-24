import { Component, Input } from '@angular/core';
import { NgIf, NgStyle } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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
  

  constructor (private route: ActivatedRoute){}  
  ngOnInit(){
    this.currentLocation = {
      lat: parseFloat(this.route.snapshot.paramMap.get('lat') || '0'),
      lng: parseFloat(this.route.snapshot.paramMap.get('lng') || '0'),
    }
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.loadMap = true;
    }, 1000);
  }
}
