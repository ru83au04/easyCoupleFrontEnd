import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WeatherComponent } from './weather/weather.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'weather', component: WeatherComponent},
    // { path: 'about', loadChildren: () => import('./about/about-routing.module').then(m => m.aboutRoutes) } // TODO: 懶加載範例
];
