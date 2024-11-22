import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { WeatherService } from './weather.service';
import { environment } from '../environments/environment';

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
  apiLoaded: Promise<boolean>;

  // lat: number = 23.5354;
  // lon: number = 120.5354;

  constructor(private weatherSrv: WeatherService){
    this.weatherSrv.FetchWeather(this.city);
    this.apiLoaded = this.loadGoogleMapsApi();
  }

  loadGoogleMapsApi(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!document.getElementById('googleMapsScript')) {
        const script = document.createElement('script');
        script.id = 'googleMapsScript';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve(true);
        script.onerror = () => reject(false);
        document.head.appendChild(script);
      } else {
        resolve(true);
      }
    });
  }
}
