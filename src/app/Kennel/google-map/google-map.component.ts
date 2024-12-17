import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { GoogleMap} from '@angular/google-maps';
import { MapService } from '../../Service/map.service';
import { environment } from '../../../environments/environment';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-google-map',
  standalone: true,
  imports: [GoogleMap, NgIf],
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  map!: google.maps.Map;
  
  @Input() currentLocation: any;

  currentLocation2: any;

  constructor(private mapSrv: MapService){}

  ngOnInit(): void{}

  ngAfterViewInit(): void{
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
            this.currentLocation2 = {
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
      center: { lat: this.currentLocation2.lat, lng: this.currentLocation2.lng }, // 初始化中心點
      zoom: 18 // 設置地圖縮放等級
    });
  
    // 添加標註
    const advancedMarkerView = new google.maps.marker.AdvancedMarkerElement({
      map: this.map,
      position: this.currentLocation2,
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
}
