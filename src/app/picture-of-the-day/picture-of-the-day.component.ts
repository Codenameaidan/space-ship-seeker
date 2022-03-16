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

  ngOnInit(): void {
    this.nasa.get_POTD().subscribe(potd =>
    {
      this.potd = potd;
    }, 
    error => {
      alert(error);
    })
  }

}
