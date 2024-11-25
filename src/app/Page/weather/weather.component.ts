import { Component } from '@angular/core';
import { WeatherService } from '../../Service/weather.service';


@Component({
  selector: 'app-weather',
  standalone: true,
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent {
  weather: any;
  sunrise!: string;
  sunset!: string;

  constructor(
    private weatherSrv: WeatherService) {}

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.weatherSrv.FetchWeather({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });

    this.weatherSrv.weather$.subscribe((data) => {
      this.weather = data;
      this.sunrise = new Date(data?.sys.sunrise).toLocaleTimeString('zh-TW', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // 使用 24 小時制
      });
      this.sunset = new Date(data?.sys.sunset).toLocaleTimeString('zh-TW', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // 使用 24 小時制
      });
    });
  }
}