import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AppFilterComponent } from './app-filter/app-filter.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { PictureOfTheDayComponent } from './picture-of-the-day/picture-of-the-day.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'map', component: MapComponent },
  { path: 'potd', component: PictureOfTheDayComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
