import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { WeatherService } from './Service/weather.service';
import { MapService } from './Service/map.service';
// import { provideGoogleMaps } from '@angular/google-maps'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    // provideGoogleMaps({ apiKey: "AIzaSyBBL6LSx0zpH_AdeElbntRlBiULVJv8ZCo"}),
    WeatherService,
    MapService,
  ]
};
