import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { MapService } from './Service/map.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular_capacitor_2';

  constructor(
    private mapSrv: MapService
  ){
    this.mapSrv.loadGoogleMapsApi(environment.googleMapsApiKey);
  }

  ngOnInit(){}
}
