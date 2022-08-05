import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MapComponent } from './map/map.component';
import { AppFilterComponent } from './app-filter/app-filter.component';
import { NearbyPlacesComponent } from './nearby-places/nearby-places.component';
import { PictureOfTheDayComponent } from './picture-of-the-day/picture-of-the-day.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { CommentboxComponent } from './about/commentbox/commentbox.component';
import { CommentsComponent } from './about/comments/comments.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavbarComponent,
    MapComponent,
    AppFilterComponent,
    NearbyPlacesComponent,
    PictureOfTheDayComponent,
    LoginComponent,
    CommentboxComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
