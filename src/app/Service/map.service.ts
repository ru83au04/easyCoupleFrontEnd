import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() {}

  // loadGoogleMap(): Promise<void>{
  //   return new Promise((resolve, reject) => {
  //     this.http.get(`${this.rootUrl}/api/google/map`, { responseType: 'text' }).subscribe(
  //       (scriptTag) => {
  //         console.log("frontEnd loadGoogleMap", scriptTag);
  //         if (!document.getElementById('googleMapsScript')) {
  //           const div = document.createElement('div');
  //           div.innerHTML = scriptTag;  // 這裡的 scriptTag 來自後端返回的字符串
  //           document.head.appendChild(div.firstChild as Node);  // 將腳本標籤插入到頁面的 <head> 中
  //           resolve(); // 請求成功，地圖腳本加載完成
  //         }
  //       },
  //       (error) => {
  //         console.error('Failed to fetch google map script: ', error);
  //         reject(error); // 如果請求或腳本加載出錯，則拒絕 Promise
  //       }
  //     );
  //   });
  // }
  
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
        document.head.appendChild(script);
      }else{
        resolve();
      }
    });
  }
}
