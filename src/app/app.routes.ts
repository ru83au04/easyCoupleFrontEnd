import { Routes } from '@angular/router';
import { HomeComponent } from './Page/home/home.component';
import { WeatherComponent } from './Page/weather/weather.component';
import { SignInComponent } from './Page/sign-in/sign-in.component';
import { ExternalComponent } from './Page/external/external.component';
import { BlogComponent } from './Page/blog/blog.component';
import { AboutComponent } from './Page/about/about.component';
import { ProjectComponent } from './Page/project/project.component';
import { userSystemGuard } from './guards/user-system.guard';
import { UserOperationComponent } from './Page/user-operation/user-operation.component';
import { DirectionComponent } from './Page/direction/direction.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'weather', component: WeatherComponent },
  {
    path: 'project',
    component: ProjectComponent,
    children: [
      { path: 'user-system', loadComponent: () => import('./Page/user-system/user-system.component').then(m => m.UserSystemComponent), canActivate: [userSystemGuard] },
      { path: 'food-map', loadComponent: () => import('./Page/food-map/food-map.component').then(m => m.FoodMapComponent) },
    ],
  },
  { path: 'signin', component: SignInComponent },
  { path: 'external/:path', component: ExternalComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'user-operation',
    component: UserOperationComponent,
    children: [
      { path: 'user-calendar', loadComponent: () => import('./Page/user-operation/user-calendar/user-calendar.component').then(m => m.UserCalendarComponent) },
      { path: 'user-info', loadComponent: () => import('./Page/user-operation/user-info/user-info.component').then(m => m.UserInfoComponent) },
      { path: 'attendance', loadComponent: () => import('./Page/user-operation/attendance/attendance.component').then(m => m.AttendanceComponent) },
    ],
  },
  { path: 'test', component: DirectionComponent}
];
