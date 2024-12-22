import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom, last, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  rootUrl = 'https://easy-couple-life.onrender.com'

  constructor(private http: HttpClient) {}
  
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

  async findFood(position: any): Promise<Object>{
    let params = new HttpParams()
    .set('lat', position.lat)
    .set('lon', position.lng)
    .set('radius', 2000);
    try{
      const response = this.http.get(`${this.rootUrl}/api/google/food`, { params });
      const data = await lastValueFrom(response);
      return data;
    }catch(err){
      console.error('Failed to fetch places data: ', err);
      return {};
    }
  }

  async getCarRoute(param: string): Promise<Object>{
    let params = new HttpParams().set('position', param);
    try{
      const res = this.http.get(`${this.rootUrl}/api/google/carRouteid`, { params });
      const data = await lastValueFrom(res);
      return data;
    }catch(err){
      console.error('Failed to fetch places data: ', err);
      return {};
    }
  }
}
