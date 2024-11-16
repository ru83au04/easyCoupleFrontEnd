import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular_capacitor_2';
  city: string = 'Tainan';
  // lat: number = 23.5354;
  // lon: number = 120.5354;

  constructor(private weatherSrv: WeatherService){
    this.weatherSrv.FetchWeather(this.city);
  }
}
