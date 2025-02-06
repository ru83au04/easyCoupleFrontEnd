import { Routes } from '@angular/router';
import { HomeComponent } from './Page/home/home.component';
import { WeatherComponent } from './Page/weather/weather.component';
import { SignInComponent } from './Page/sign-in/sign-in.component';
import { ExternalComponent } from './Page/external/external.component';
import { BlogComponent } from './Page/blog/blog.component';
import { AboutComponent } from './Page/about/about.component';
import { ProjectComponent } from './Page/project/project.component';
import { userSystemGuard } from './guards/user-system.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'weather', component: WeatherComponent},
    {
        path: 'project', component: ProjectComponent, children: [
            { path: 'user-system', loadComponent: () => import('./Page/user-system/user-system.component').then(m => m.UserSystemComponent), canActivate: [userSystemGuard] },
            { path: 'food-map', loadComponent: () => import('./Page/food-map/food-map.component').then(m => m.FoodMapComponent) }    
    ]},
    { path: 'signin', component: SignInComponent},
    { path: 'external/:path', component: ExternalComponent},
    { path: 'blog', component: BlogComponent},
    { path: 'about', component: AboutComponent},
];
