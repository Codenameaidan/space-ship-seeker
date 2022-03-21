import { Component, OnInit } from '@angular/core';
import { LocationInfo, Observatory_with_location } from 'src/models/LocationInfo';
import { Observatory, ObservatoryResponse} from 'src/models/NasaSatellite';
import { SpaceXLaunch } from 'src/models/SpaceXLaunch';
import { SpaceXLaunchpad } from 'src/models/SpaceXLaunchpad';
import { SpaceXStarLink } from 'src/models/SpaceXStarLink';
import { AppFilterComponent } from '../app-filter/app-filter.component';
import { NasaService } from '../nasa.service';
import { SpaceXService } from '../space-x.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(public spaceX: SpaceXService, public nasa: NasaService) { 

  }

  public launchpads?: SpaceXLaunchpad[];
  public launch?: SpaceXLaunch;
  public starlinks?: SpaceXStarLink[];

  public observatories?: ObservatoryResponse;
  public observatory_Locations?: Observatory_with_location[];

  ngOnInit(): void {

    //Here's how you can get all the launchpads
    this.spaceX.get_all_launchpads().subscribe(l =>
    {
      this.launchpads = l;
    }, 
    error => {
      alert(error);
    })

    //Heres how you can get an individual rocket; 'launchpads' have a list of these IDs
    this.spaceX.get_launch_by_id("5eb87cddffd86e000604b32f").subscribe(l =>
      {
        this.launch = l;
      }, 
      error => {
        alert(error);
      })


    //Heres how you can get all satellites
    this.spaceX.get_all_starlink().subscribe(l =>
      {
        this.starlinks= l;
      }, 
      error => {
        alert(error);
      })

    //All(?) Nasa Satellites.... (You need to call get_locations NESTED WITHIN get_observatories)
    this.nasa.get_observatories().subscribe(l=> {
      l = l.filter(x=>new Date(x.EndTime[1]) > new Date()); //Make sure dates are valid
      this.nasa.get_locations(l).subscribe(z=>{
        this.observatory_Locations = z;
      })
    }, 
    error => {
      alert(error);
      
    })
  }

}
