import { ElementRef, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { GoogleMap, MapMarker } from '@angular/google-maps';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  rootUrl = environment.rootURL;
  currentLocation: any;
  map!: google.maps.Map;
  resultMarks: any[] = [];

  constructor(private http: HttpClient) {}
  
  // NOTE:將 Google Map使用的腳本動態建立並放入HTML中
  loadGoogleMapsApi(apiKey: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if(typeof google !== 'undefined' && google.maps){
        resolve();
      }else if(!document.getElementById('googleMapsScript')){
        const script = document.createElement('script');
        script.id = 'googleMapsScript';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject();
        document.body.appendChild(script);
      }else{
        resolve();
      }
    });
  }
  // NOTE:取得使用者位置
  getUserLocation(): Promise<void> {
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
  // NOTE: 初始化地圖
  initMap(mapContainer: ElementRef): void {
    // 確保地圖容器已經準備好
    const mapElement = mapContainer.nativeElement;

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

    mapElement.style.margin = '30px';
  }
  // NOTE: 將使用者位置圖示放入地圖
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
  // NOTE: 建立搜尋結果圖示
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
  // NOTE: 搜尋結果圖示加入地圖
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

      if(this.resultMarks.length > 0){
        this.clearMarkers();
      }
  
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
  // NOTE: 清除地圖上的搜尋結果圖示
  clearMarkers(){
    this.resultMarks.forEach((mark) => mark.map = null);
    this.resultMarks = [];
  }
  // NOTE: 搜尋選定行政區內的所有地點
  async searchByArea(area: string): Promise<void>{
    try{
      let params = new HttpParams().set('area', area);
      const res = this.http.get<Object[]>(`${this.rootUrl}/api/google/searchByArea`, { params });
      const areaPosition = await lastValueFrom(res);
      this.addMarkersToMap(areaPosition, 1);
    }catch(err){
      console.error('Failed to fetch places data: ', err);
    }
  }
  // NOTE: 搜尋選定區域與時間段內的所有地點
  async searchByAreaAndTime(area: string, time: string): Promise<void>{
    try{
      let params = new HttpParams().set('area', area).set('time', time);
      const res = this.http.get<Object[]>(`${this.rootUrl}/api/google/searchByAreaAndTime`, { params });
      const areaPosition = await lastValueFrom(res);
      this.addMarkersToMap(areaPosition, 1);
    }catch(err){
      console.error('Failed to fetch places data: ', err);
    }
  }
  // NOTE: 搜尋使用者所在地附近的餐廳
  async findFood(): Promise<void>{
    let params = new HttpParams()
    .set('lat', this.currentLocation.lat)
    .set('lon', this.currentLocation.lng)
    .set('radius', 2000);
    try {
      const response = this.http.get<Object[]>(`${this.rootUrl}/api/google/food`, { params });
      const data = await lastValueFrom(response);
      this.addMarkersToMap(data, 0);
    }catch(err){
      console.error('Failed to fetch places data: ', err);
    }
  }
  // NOTE: 取得行政區列表
  async getAreaList(): Promise<{area: string}[]>{
    try {
      console.log('getAreaList', this.rootUrl);
      const res = this.http.get<{area: string}[]>(`${this.rootUrl}/api/google/areaList`);
      const areas = await lastValueFrom(res);
      return areas;
    }catch(err){
      console.error('Failed to fetch places data: ', err);
      return [];
    }
  }
}

export enum searchType {
  food = 0,
  trashCarPosition = 1,
}
