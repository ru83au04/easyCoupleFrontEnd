import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMap, MapMarker } from '@angular/google-maps';



@NgModule({
  declarations: [],
  imports: [CommonModule, GoogleMap, Map,],
  exports: [GoogleMap, MapMarker],
})
export class GoogleMapsModule { }
