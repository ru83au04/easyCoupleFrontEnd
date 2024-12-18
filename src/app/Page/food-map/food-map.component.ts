import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgIf, NgStyle } from '@angular/common';
import { MapService } from '../../Service/map.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-food-map',
  standalone: true,
  imports: [NgIf, NgStyle],
  templateUrl: './food-map.component.html',
  styleUrl: './food-map.component.css'
})
export class FoodMapComponent {
  currentLocation: any;
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  map!: google.maps.Map;

  constructor(private mapSrv: MapService){}

  
  ngOnInit(){
  }

  ngAfterViewInit (){
    this.mapSrv.loadGoogleMapsApi(environment.googleMapsApiKey)
    .then(() => this.getUserLocation())
    .then(() => this.initMap())
    .catch((err) => console.error('Google Maps 加載失敗', err)); 
  }

  private getUserLocation(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.currentLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            resolve();
          },
          (error) => {
            console.error('無法取得位置:', error);
            reject('無法取得使用者位置');
          }
        );
      } else {
        reject('瀏覽器不支援 Geolocation API');
      }
    });
  }

  initMap(): void {
    // 確保地圖容器已經準備好
    const mapElement = this.mapContainer.nativeElement;
  
    // 初始化地圖
    this.map = new google.maps.Map(mapElement, {
      mapId: environment.googleMapsId,
      center: { lat: this.currentLocation.lat, lng: this.currentLocation.lng }, // 初始化中心點
      zoom: 18 // 設置地圖縮放等級
    });
  
    // 添加標註
    const advancedMarkerView = new google.maps.marker.AdvancedMarkerElement({
      map: this.map,
      position: this.currentLocation,
      title: 'Advanced Marker',
      content: this.createCustomMarkerContent(),
    });
  }

  createCustomMarkerContent() {
    const div = document.createElement('div');
    const img = document.createElement('img');
    div.textContent = "U R Here";
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.alignItems = "center";
    div.style.color = "Blue";
    img.src = "../../assets/noah.png";
    img.style.width = "35px";
    img.style.height = "auto";
    div.appendChild(img);

    return div;
  }

  createMark() {
    const div = document.createElement('div');
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.alignItems = "center";
    div.style.color = "Blue";

    return div;
  }


  async findFood(){
    let foodResult: any;
    foodResult = await this.mapSrv.findFood(this.currentLocation);
    console.log("foodResult", foodResult);
    this.addMarkersToMap(foodResult.places);
    console.log("result", foodResult.places);
  }

  addMarkersToMap(places: any[]): Promise<void> {
    return new Promise((resolve, reject) => {places.forEach((place) => {
      if(places.length != 0){
        const advancedMarkerView = new google.maps.marker.AdvancedMarkerElement({
          map: this.map,
          position: {
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
          },
          title: 'eat',
          content: this.createMark(),
        });
        resolve()
      }else{
        reject("找不到餐廳");
      }
    });
  })}
}
