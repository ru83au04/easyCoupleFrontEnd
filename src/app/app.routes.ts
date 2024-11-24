import { Routes } from '@angular/router';
import { HomeComponent } from './Page/home/home.component';
import { WeatherComponent } from './Page/weather/weather.component';
import { FoodMapComponent } from './Page/food-map/food-map.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'weather/:lat/:lng', component: WeatherComponent},
    { path: 'foodmap/:lat/:lng', component: FoodMapComponent},
];
