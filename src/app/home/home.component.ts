import { Component, OnInit } from '@angular/core';
import { POTD } from 'src/models/POTD';
import { NasaService } from '../nasa.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
//import fetch from 'node-fetch';
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
  public minutes?:any;
  public name?:any;
  public currentTimeInSeconds?:any;
  public timeleft?:any;
  
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

    
    setInterval(() => this.countDown(), 1000);
      

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
  
      
      response.json().then(data => {
        console.log(data);
        let day = data[0]['date_unix'];
        var currentTimeInSeconds=Math.floor(Date.now()/1000);
        this.timeleft = day - currentTimeInSeconds;
        this.name = data[0]['name'];
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

  countDown() : void{
    this.timeleft -= 1;
    this.days = Math.floor(this.timeleft / ( 60 * 60 * 24));
    this.hours = Math.floor(this.timeleft / 3600);
    this.minutes = Math.floor(this.timeleft / 60 % 60);
    this.seconds = Math.floor(this.timeleft % 60);
    if(this.timeleft <= 0){
        this.getData();
    }

    //console.log("任务:每天爱daddy", this.timeleft, "点");// not work

  }
  
  
  
  
  
}
function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}



