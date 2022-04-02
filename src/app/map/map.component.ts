import { Component, OnInit } from '@angular/core';
import { LocationInfo, Observatory_with_location } from 'src/models/LocationInfo';
import { Observatory, ObservatoryResponse} from 'src/models/NasaSatellite';
import { SpaceXLaunch } from 'src/models/SpaceXLaunch';
import { SpaceXLaunchpad } from 'src/models/SpaceXLaunchpad';
import { SpaceXStarLink } from 'src/models/SpaceXStarLink';
import { AppFilterComponent } from '../app-filter/app-filter.component';
import { NasaService } from '../nasa.service';
import { SpaceXService } from '../space-x.service';


//import { firstValueFrom } from 'rxjs';

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

  //For displaying : use the filtered objects!
  public filtered_observatories?: Observatory_with_location[];
  public filtered_launchpads?: SpaceXLaunchpad[];
  public filtered_starlinks?: SpaceXStarLink[];

  //What should be displayed?
  public showLaunchpads: boolean = true;
  public showStarlink: boolean = true;
  public showNasa: boolean = true;

  ngOnInit(): void {
    /*
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
    */
    this.update_everything();
  }

  async update_everything(){
      let response = await this.spaceX.get_all_launchpads().toPromise();
      this.launchpads = response;
      
      response = await this.spaceX.get_all_starlink().toPromise();
      this.starlinks= response;

      let response2 = await this.nasa.get_observatories().toPromise();
      response2 = response2.filter(x=>new Date(x.EndTime[1]) > new Date())
      this.observatory_Locations = await this.nasa.get_locations(response2).toPromise();

      this.filtered_launchpads = this.launchpads;
      this.filtered_observatories = this.observatory_Locations;
      this.filtered_starlinks = this.starlinks;
  }

  async filter(){
    //await this.update_everything();

    //Record whether checkboxes are selected
    this.showLaunchpads = (<HTMLInputElement>document.getElementById("spacex-launchpads")).checked;
    this.showStarlink = (<HTMLInputElement>document.getElementById("spacex")).checked;
    this.showNasa = (<HTMLInputElement>document.getElementById("nasa")).checked;

    //Filter by name (ID in some situations)
    let name = (<HTMLInputElement>document.getElementById("name")).value;
    if(name != null){
      if(this.launchpads)
        this.filtered_launchpads = this.launchpads.filter(item => item!.name!.includes(name));
      if(this.observatory_Locations)
        this.filtered_observatories = this.observatory_Locations.filter(item => item!.id!.includes(name));
      if(this.starlinks)
        this.filtered_starlinks = this.starlinks.filter(item => item!.id!.includes(name));
    }else{
      this.filtered_launchpads = this.launchpads;
      this.filtered_observatories = this.observatory_Locations;
      this.filtered_starlinks = this.starlinks;
    }
    
  }

}
