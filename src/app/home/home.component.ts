import { Component, OnInit } from '@angular/core';
import { POTD } from 'src/models/POTD';
import { NasaService } from '../nasa.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import fetch from 'node-fetch';
import { NumberSymbol } from '@angular/common';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public nasa: NasaService, private _sanitizer: DomSanitizer) { }



  public potd?: POTD;
  public POTDVidUrl?: SafeResourceUrl;

  public days?:any;
  public seconds?:any;
  public hours?:any;
  public minites?:any;
  

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

      this.getData();



      

  }
  
  
  async getData() {
    try {
      // 👇️ const response: Response
      const response = await fetch('https://api.spacexdata.com/v4/launches/upcoming', {
        method: 'GET',
      })
  
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
  
      //console.log(response.json());
      response.json().then(data => {
        console.log(data);
        let day = data[0]['date_unix'];
        var currentTimeInSeconds=Math.floor(Date.now()/1000);
        this.seconds = day - currentTimeInSeconds;
        //console.log(this.seconds);
      })
      
      
      
  
      return response;
    } catch (error) {
      if (error instanceof Error) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
    
  }
  
  
}




