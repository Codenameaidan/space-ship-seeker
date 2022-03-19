import { Component, OnInit } from '@angular/core';
import { POTD } from 'src/models/POTD';
import { NasaService } from '../nasa.service';

@Component({
  selector: 'app-picture-of-the-day',
  templateUrl: './picture-of-the-day.component.html',
  styleUrls: ['./picture-of-the-day.component.scss']
})
export class PictureOfTheDayComponent implements OnInit {

  constructor(public nasa: NasaService) { 

  }

  public potd?: POTD;
  public currentDate: string = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, 10);

  ngOnInit(): void {
    this.nasa.get_POTD().subscribe(potd =>
    {
      this.potd = potd;
    }, 
    error => {
      alert(error);
    })
  }

  getPOTDForDay(date: string): void {
    if(date.length > 0) {
      this.nasa.get_POTD_date(date).subscribe(potd =>
      {
        if(potd.media_type !== "video") {
          this.potd = potd;
        }
      }, 
      error => {
        alert(error);
      })
    }
  }

}
