import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { POTD } from 'src/models/POTD';

@Injectable({
  providedIn: 'root'
})
export class NasaService {
  public POTD_url = "https://api.nasa.gov/planetary/apod";
  public key = "cPaPI9UtP9v7ymHVePI6KDIKaRVxopFm49btQXof";
  constructor(private http:HttpClient) { }

  public get_POTD(){
     return this.http.get<POTD>(this.POTD_url+"?api_key="+this.key);
  }

  public get_satellites(){
    
  }
}
