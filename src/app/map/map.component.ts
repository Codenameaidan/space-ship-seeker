import { Component, OnInit } from '@angular/core';
import { SpaceXLaunch } from 'src/models/SpaceXLaunch';
import { SpaceXLaunchpad } from 'src/models/SpaceXLaunchpad';
import { SpaceXStarLink } from 'src/models/SpaceXStarLink';
import { AppFilterComponent } from '../app-filter/app-filter.component';
import { SpaceXService } from '../space-x.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(public spaceX: SpaceXService) { 

  }

  public launchpads?: SpaceXLaunchpad[];
  public launch?: SpaceXLaunch;
  public starlinks?: SpaceXStarLink[];

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
  }

}
