import { Component } from '@angular/core';
import { WeatherService } from '../../Service/weather.service';
import { ActivatedRoute } from '@angular/router';


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
  lat!: string | null;
  lng!: string | null;

  constructor(
    private weatherSrv: WeatherService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.lat = this.route.snapshot.paramMap.get('lat') || '0';
    this.lng = this.route.snapshot.paramMap.get('lng') || '0';
    
    this.weatherSrv.FetchWeather({
      lat: parseFloat(this.lat),
      lng: parseFloat(this.lng)
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