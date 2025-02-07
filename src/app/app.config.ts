import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { WeatherService } from './Service/weather.service';
import { MapService } from './Service/map.service';
import { BlogService } from './Service/blog.service';
import { UserService } from './Service/user.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    WeatherService,
    MapService,
    BlogService,
    UserService, provideAnimationsAsync(),
  ]
};
