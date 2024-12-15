import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private weatherSubject = new BehaviorSubject<any>(null); // 初始化時為空
  public weather$ = this.weatherSubject.asObservable();
  rootUrl = 'https://easy-couple-life.onrender.com'

  constructor(private http: HttpClient) {}

  async FetchWeather(position: any): Promise<void> {
    let params = new HttpParams().set('lat', position.lat).set('lon', position.lng);
    
    try{
      const response = this.http.get(`${this.rootUrl}/api/weather/local`, { params });
      const data = await lastValueFrom(response);
      this.weatherSubject.next(data);
    }catch(error){
      console.error('Failed to fetch weather data: ', error);
    }
  }
}
