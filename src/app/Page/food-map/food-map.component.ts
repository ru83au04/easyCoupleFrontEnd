import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgIf, NgStyle, NgFor } from '@angular/common';
import { MapService } from '../../Service/map.service';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-food-map',
  standalone: true,
  imports: [NgIf, NgStyle, FormsModule, NgFor],
  templateUrl: './food-map.component.html',
  styleUrl: './food-map.component.css'
})
export class FoodMapComponent {
  currentLocation: any;
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  map!: google.maps.Map;
  resultMarks: any[] = [];
  areas?: {area: string}[];
  timeList: string[] = [];
  selectedArea: string = "";
  selectedTIme: string = "";

  constructor(private mapSrv: MapService){}

  
  ngOnInit(){
    this.setAreaList();
    this.setTimeList();
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

  // 初始化地圖
  initMap(): void {
    // 確保地圖容器已經準備好
    const mapElement = this.mapContainer.nativeElement;

    // 初始化地圖
    this.map = new google.maps.Map(mapElement, {
      mapId: environment.googleMapsId,
      center: { lat: this.currentLocation.lat, lng: this.currentLocation.lng }, // 初始化中心點
      zoom: 18, // 設置地圖縮放等級
    });
  
    // 添加標註
    const advancedMarkerView = new google.maps.marker.AdvancedMarkerElement({
      map: this.map,
      position: this.currentLocation,
      title: 'Advanced Marker',
      content: this.createCustomMarkerContent(),
    });
  }
  // 建立使用者位置圖示放入地圖
  createCustomMarkerContent() {
    const div = document.createElement('div');
    const img = document.createElement('img');
    div.textContent = "U R Here";
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.alignItems = "center";
    div.style.color = "Blue";
    img.src = "../../assets/person.png";
    img.style.width = "70px";
    img.style.height = "auto";
    div.appendChild(img);

    return div;
  }
  // 建立搜尋結果圖示
  createMark(displayName: string, type: searchType) {
    const div = document.createElement('div');
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.alignItems = "center";
    div.style.color = "blue";

    const text = document.createElement('span');
    text.textContent = displayName; // 動態更新為地點名稱
    text.style.fontWeight = 'bold';

    const img = document.createElement('img');
    switch(type){
      case searchType.food:
        img.src = "../../assets/food.png"; // 自定義圖示
        break;
      case searchType.trashCarPosition:
        img.src = "../../assets/誰偷了垃圾桶.png";
    }
    img.style.width = '50px';
    img.style.height = '50px';

    div.appendChild(img);
    div.appendChild(text);

    return div;
  }
  // 搜尋結果圖示加入地圖
  addMarkersToMap(places: any[], type: searchType): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!places || places.length === 0) {
        reject('找不到指定內容');
        return;
      }
  
      // 確保地圖已初始化
      if (!this.map) {
        reject('地圖尚未初始化');
        return;
      }
  
      let completedMarkers = 0; // 計算已完成的標記數量
  
      // 遍歷地點數據，創建標記
      places.forEach((place) => {
        let marker;
        switch(type){
          case searchType.food:
            marker = new google.maps.marker.AdvancedMarkerElement({
              map: this.map, // 將標記放置到現有地圖上
              position: {
                lat: place.location.latitude,
                lng: place.location.longitude,
              },
              title: place.displayName.text, // 標示標題
              content: this.createMark(place.displayName.text, 0), // 標示樣式
            });
            break;
          case searchType.trashCarPosition:
            marker = new google.maps.marker.AdvancedMarkerElement({
              map: this.map, // 將標記放置到現有地圖上
              position: {
                lat: parseFloat(place.latitude),
                lng: parseFloat(place.longitude),
              },
              title: place.time, // 標示標題
              content: this.createMark(place.time, 1), // 標示樣式
            });
            break;
        }
        
        // 當標記完成後增加計數器
        completedMarkers++;

        this.resultMarks.push(marker);
  
        // 當所有標記完成後執行 resolve
        if (completedMarkers === places.length) {
          resolve();
        }
      });
    }
  );
  }
  // 清除地圖上的搜尋結果圖示
  clearMarkers(){
    this.resultMarks.forEach((mark) => mark.map = null);
    this.resultMarks = [];
  }
  // 搜尋使用者附近的餐廳
  async findFood(){
    let foodResult: any;
    foodResult = await this.mapSrv.findFood(this.currentLocation);
    await this.addMarkersToMap(foodResult, 0);
  }
  // 建立行政區清單(做為選項清單，所以結果不重複)
  async setAreaList(){
    this.areas = await this.mapSrv.getAreaList();
  }
  // 建立時間選項清單
  setTimeList(){
    for(let h = 0; h < 24; h++){
      const hour = h.toString().padStart(2, '0');
      this.timeList.push(`${hour}:00`, `${hour}:30`);
    }
  }
  // 選定 AREA與 Time之後搜尋並建立地標
  async search(area: string, time: string){
    if(this.resultMarks.length > 0){
      this.clearMarkers();
    }
    if(area === "" || time === ""){
      console.log("時間或地點不得為空");
      return;
    }
    let resultArea = await this.mapSrv.searchByAreaAndTime(area, time);
    this.addMarkersToMap(resultArea, 1);
  }
  // 選定 AREA後，將該區域內所有清運地點標示在地圖上
  async choiceArea(area: string){
    let resultArea = await this.mapSrv.searchByArea(area);
    this.addMarkersToMap(resultArea, 1);
  }
}

export enum searchType {
  food = 0,
  trashCarPosition = 1,
}