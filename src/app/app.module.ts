import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MapComponent } from './map/map.component';
import { AppFilterComponent } from './app-filter/app-filter.component';
import { NearbyPlacesComponent } from './nearby-places/nearby-places.component';
import { PictureOfTheDayComponent } from './picture-of-the-day/picture-of-the-day.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavbarComponent,
    MapComponent,
    AppFilterComponent,
    NearbyPlacesComponent,
    PictureOfTheDayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }