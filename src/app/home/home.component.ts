import { Component, OnInit } from '@angular/core';
import { POTD } from 'src/models/POTD';
import { NasaService } from '../nasa.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public nasa: NasaService, private _sanitizer: DomSanitizer) { }

  public potd?: POTD;
  public POTDVidUrl?: SafeResourceUrl;

  ngOnInit(): void {
    this.nasa.get_POTD().subscribe(potd =>
      {
        this.potd = potd;
        if(potd.media_type == 'video') {
          this.POTDVidUrl = this._sanitizer.bypassSecurityTrustResourceUrl(potd.url);
        }
      }, 
      error => {
        alert(error);
      })
  }

}
