import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { POTD } from 'src/models/POTD';
import { Observatory, ObservatoryResponse} from 'src/models/NasaSatellite';
import { LocationInfo, Observatory_with_location, Result, RootObject } from 'src/models/LocationInfo';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NasaService {
  public POTD_url = "https://api.nasa.gov/planetary/apod";
  public key = "cPaPI9UtP9v7ymHVePI6KDIKaRVxopFm49btQXof";

  public observatory_url = "https://sscweb.gsfc.nasa.gov/WS/sscr/2/observatories";
  public location_url = "https://sscweb.gsfc.nasa.gov/WS/sscr/2/locations/";


  constructor(private http:HttpClient) { }

  public get_POTD(){
     return this.http.get<POTD>(this.POTD_url+"?api_key="+this.key);
  }
  public get_POTD_date(date:string){
    let params = new HttpParams()
    params = params.append('api_key',this.key);
    params = params.append('date',date);
    
    return this.http.get<POTD>(this.POTD_url, { params: params })
  }

  //Get all 'observatories' without location information
  public get_observatories(){
    return this.http.get<ObservatoryResponse>(this.observatory_url).pipe(
      map(x=>(x.Observatory[1] as Observatory[]))
    );
  }

  //Get location information for given observatories
  public get_locations(satellites: Observatory[]){
    let q_str = ""
    for(let x = 0;x<satellites.length && x < 20;x++){
      q_str+=(satellites[x].Id+",");
    }
    q_str = q_str.slice(0,-1);
  
    //Set time range: now, and 25 minutes ago (the minimum time range allowed)
    let now:Date = new Date();
    now.setDate(now.getDate());
    let prev:Date = new Date();
    prev.setMinutes(prev.getMinutes() - 25);

    //Make actual call
    return this.http.get<RootObject>(this.location_url+q_str+"/"
      +this.formatDate_ISO(prev)+","
      +this.formatDate_ISO(now)+"/geo").pipe(

         //Map weird JSON response to some actually sensible data
        map(x=>{
          let data = x.Result.Data[1]
          console.log(data);
          let result:Observatory_with_location[] = [];
         
          for(let i = 0;i<data.length;i++){
            let temp:Observatory_with_location = new Observatory_with_location();
            temp.id = data[i].Id;
            temp.latitude = data[i].Coordinates[1][0].Latitude[1];
            temp.longitude = data[i].Coordinates[1][0].Longitude[1];
            result.push(temp);
          }
          
          return result; //An array of Observatory_with_location
        })
      );
  }

  //Format date as an ISO (in the very specific way that the NASA API wants it...)
  private formatDate_ISO(date:Date){
    let x = date.toISOString()
    x = x.substring(0,19) + "Z";
    x = x.replace(/-/g,'');
    x = x.replace(/:/g,'');
    x = x.replace(/\./g, '');

    return x;
    
  }

  private formatDate(date:Date){
    return date.getUTCFullYear()+"-"+date.getUTCMonth()+"-"+date.getUTCDate();
  }

}