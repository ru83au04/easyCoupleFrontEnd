import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgFor } from '@angular/common';
import { MapService } from '../../Service/map.service';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-food-map',
  standalone: true,
  imports: [ FormsModule, NgFor],
  templateUrl: './food-map.component.html',
  styleUrl: './food-map.component.css'
})
export class FoodMapComponent {
  currentLocation: any;
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  map!: google.maps.Map;
  areas?: {area: string}[];
  timeList: string[] = [];
  selectedArea: string = "";
  selectedTIme: string = "";

  constructor(private mapSrv: MapService){}

  /* NOTE:
    1. 頁面初始化的時候，建立行政區清單與時間選項清單
   */
  ngOnInit(){
    this.setAreaList();
    this.setTimeList();
  }

  /* NOTE:
    1. 載入 Google Maps API
    2. 取得使用者位置
    3. 初始化地圖
  */
  async ngAfterViewInit() {
    try {
      await this.mapSrv.loadGoogleMapsApi(environment.googleMapsApiKey)
      await this.mapSrv.getUserLocation();
      this.mapSrv.initMap(this.mapContainer);      
    } catch (err) {
      console.error('Google Maps 加載失敗', err);
    }  
  }
  // NOTE: 建立行政區清單(做為選項清單，所以結果不重複)
  async setAreaList(){
    this.areas = await this.mapSrv.getAreaList();
  }
  // NOTE: 建立時間選項清單
  setTimeList(){
    for(let h = 0; h < 24; h++){
      const hour = h.toString().padStart(2, '0');
      this.timeList.push(`${hour}:00`, `${hour}:30`);
    }
  }
  // NOTE: 選定指定條件後搜尋並建立地標(指定地點或指定地點、時間)
  async search(area: string, time: string) {
    if(area === ""){
      console.log("地點不得為空");
      return;
    }
    if (time === "" && area !== "") {
      await this.mapSrv.searchByArea(area);
      return;
    }
    await this.mapSrv.searchByAreaAndTime(area, time);
  }
  // NOTE: 搜尋使用者所在地附近的餐廳
  async findFood() {
    await this.mapSrv.findFood();
  }
  // NOTE: 清除地圖上使用者位置以外的座標
  clearMarkers() {
    this.mapSrv.clearMarkers();
  }
}