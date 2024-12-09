import { Routes } from '@angular/router';
import { HomeComponent } from './Page/home/home.component';
import { WeatherComponent } from './Page/weather/weather.component';
import { FoodMapComponent } from './Page/food-map/food-map.component';
import { SignInComponent } from './Page/sign-in/sign-in.component';
import { ExternalComponent } from './Page/external/external.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'weather', component: WeatherComponent},
    { path: 'foodmap', component: FoodMapComponent},
    { path: 'signin', component: SignInComponent},
    { path: 'external/:path', component: ExternalComponent},
];
