import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { WeatherService } from './Service/weather.service';
import { MapService } from './Service/map.service';
import { AttendanceService } from './Service/attendance.service';
import { BlogService } from './Service/blog.service';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
// import { provideGoogleMaps } from '@angular/google-maps'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    // provideGoogleMaps({ apiKey: "AIzaSyBBL6LSx0zpH_AdeElbntRlBiULVJv8ZCo"}),
    WeatherService,
    MapService,
    BlogService,
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          css: () => import('highlight.js/lib/languages/css'),
          xml: () => import('highlight.js/lib/languages/xml'),
          json: () => import('highlight.js/lib/languages/json'),
          scss: () => import('highlight.js/lib/languages/scss'),
          javascript: () => import('highlight.js/lib/languages/javascript')
        },
      },
    },
    AttendanceService,
  ]
};
