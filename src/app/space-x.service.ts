import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SpaceXLaunchpad } from 'src/models/SpaceXLaunchpad';
import { SpaceXLaunch } from 'src/models/SpaceXLaunch';
import { SpaceXStarLink } from 'src/models/SpaceXStarLink';

@Injectable({
  providedIn: 'root'
})
export class SpaceXService {
  public base_url = "https://api.spacexdata.com/";
  
  constructor(private http:HttpClient) { }

  public get_all_launchpads(){
     return this.http.get<SpaceXLaunchpad[]>(this.base_url+"v4/launchpads");
  }

  public get_launch_by_id(id:string)
  {
    return this.http.get<SpaceXLaunch>(this.base_url+"v5/launches/"+id);
  }
  public get_all_starlink(){
    return this.http.get<SpaceXStarLink[]>(this.base_url+"v4/starlink/");
  }
}
