import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { GoogleMap} from '@angular/google-maps';
import { MapService } from '../../Service/map.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-google-map',
  standalone: true,
  imports: [GoogleMap],
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  map!: google.maps.Map;
  
  @Input() currentLocation: any;

  constructor(private googleMapService: MapService){}

  ngOnInit(): void{
    console.log("frontEnd ngOninit");
    this.googleMapService.loadGoogleMap().then(() => {
      // 當腳本加載完成後，初始化地圖
      this.initMap();
    }).catch((err) => {
      console.error('Google Map 加載失敗', err);
    });    
  }

  ngAfterViewInit(): void{
    
  }

  initMap(): void {
    // 確保地圖容器已經準備好
    console.log("frontEnd initMap");
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
}
