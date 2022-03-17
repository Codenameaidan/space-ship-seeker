import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  public get_POTD_date(date:Date){
    let params = new HttpParams()
    params = params.append('api_key',this.key);
    params = params.append('date',this.formatDate(date));
    
    return this.http.get<POTD>(this.POTD_url, { params: params })
  }

  public get_satellites(){
    
  }

  private formatDate(date:Date){
    return date.getUTCFullYear()+"-"+date.getUTCMonth()+"-"+date.getUTCDate();
  }
}
