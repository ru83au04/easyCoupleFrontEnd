import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private weatherSubject = new BehaviorSubject<any>(null); // 初始化時為空
  public weather$ = this.weatherSubject.asObservable();

  constructor(private http: HttpClient) {}

  async FetchWeather(city: string): Promise<void> {
    const apiKey = 'b7bdb04cbc84a42d90524c385e810a7a';
    // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`;

    try{
      const data = await lastValueFrom(this.http.get(apiUrl));
      this.weatherSubject.next(data);
    }catch(error){
      console.error('Failed to fetch weather data: ', error);
    }
  }
}
