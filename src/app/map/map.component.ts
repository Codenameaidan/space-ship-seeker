import { Component, OnInit } from '@angular/core';
import { LocationInfo, Observatory_with_location } from 'src/models/LocationInfo';
import { Observatory, ObservatoryResponse } from 'src/models/NasaSatellite';
import { SpaceXLaunch } from 'src/models/SpaceXLaunch';
import { SpaceXLaunchpad } from 'src/models/SpaceXLaunchpad';
import { SpaceXStarLink } from 'src/models/SpaceXStarLink';
import { AppFilterComponent } from '../app-filter/app-filter.component';
import { NasaService } from '../nasa.service';
import { SpaceXService } from '../space-x.service';
import ArcGISMap from "@arcgis/core/Map";
import SceneView from "@arcgis/core/views/SceneView";
import esriConfig from "@arcgis/core/config";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Point from '@arcgis/core/geometry/Point';
import LayerList from '@arcgis/core/widgets/LayerList';
import Search from '@arcgis/core/widgets/Search';
//    require(["esri/config", "esri/rest/locator", "esri/Map", "esri/views/SceneView", "esri/Graphic", "esri/layers/GraphicsLayer"], 
//(esriConfig, locator, Map, SceneView, Graphic, GraphicsLayer) => {
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
  public graphicsLayer = new GraphicsLayer();
  public graphicsLayerNasa = new GraphicsLayer();
  public graphicsLayerLaunch = new GraphicsLayer();
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
    this.graphicsLayer.title = "SpaceX Sattelites";
    this.graphicsLayerLaunch.title = "LaunchPads";
    this.graphicsLayerNasa.title = "Nasa Sattelites";
    const map = new ArcGISMap({
      basemap: "topo-vector",
      ground: "world-elevation"
    });

    const view = new SceneView({
      map: map,
      container: "viewDiv",
      center: [-118.244, 34.052],
      scale: 50000000,
    });

    view.when(() => {
      const layerList = new LayerList({
        view: view
      });

      // Add the search widget to the top right corner of the view
  
     

      view.ui.add(layerList, "top-right");
    });



    map.add(this.graphicsLayer);
    map.add(this.graphicsLayerNasa);
    map.add(this.graphicsLayerLaunch);

    this.update_everything();
  }

  async update_everything() {
    let response = await this.spaceX.get_all_launchpads().toPromise();
    this.launchpads = response;

    response = await this.spaceX.get_all_starlink().toPromise();
    this.starlinks = response;

    let response2 = await this.nasa.get_observatories().toPromise();
    response2 = response2.filter(x => new Date(x.EndTime[1]) > new Date())
    this.observatory_Locations = await this.nasa.get_locations(response2).toPromise();

    this.filtered_launchpads = this.launchpads;
    this.filtered_observatories = this.observatory_Locations;
    this.filtered_starlinks = this.starlinks;



    var x = 0;
    this.filtered_observatories.forEach(element => {
      if (element.latitude != null && element.longitude != null) {

        const point = new Point({ //Create a point

          latitude: element.latitude[0],
          longitude: element.longitude[0]
        });


        const markerSymbol = {
          type: "simple-marker",
          color: [255, 0, 0],  // Orange
          outline: {
            color: [255, 255, 255], // White
            width: 1
          }
        };
        const popupTemplate = {
          title: "{Name}",
          content: "{Description}"
        }
        const attributes = {
          Name: "" + element.id + "  " + this.filtered_observatories?.length,
          Description: "This is a really good description" + element.latitude?.length
        }

        const pointGraphic = new Graphic({
          geometry: point,
          symbol: markerSymbol,

          attributes: attributes,
          popupTemplate: popupTemplate
        });
        this.graphicsLayerNasa.add(pointGraphic);
        x = x + 1;
      }

    });

    this.filtered_starlinks.forEach(element => {
      const point = new Point({ //Create a point
        latitude: element.latitude,
        longitude: element.longitude,
        z: element.height_km
      });

      const markerSymbol = {
        type: "simple-marker",
        color: [0, 0, 255],  // Orange
        outline: {
          color: [255, 255, 255], // White
          width: 1
        }
      };
      const popupTemplate = {
        title: "{Name}",
        content: "{Description}"
      }
      const attributes = {
        Name: "" + element.id+" "+element.launch+" "+element.version,
        Description: "This is a really good description" + element.velocity_kms
      }

      const pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol,

        attributes: attributes,
        popupTemplate: popupTemplate
      });
      this.graphicsLayer.add(pointGraphic);
      x = x + 1;
    });

    this.filtered_launchpads.forEach(element => {
      const point = new Point({ //Create a point
        latitude: element.latitude,
        longitude: element.longitude

      });

      const markerSymbol = {
        type: "simple-marker",
        color: [0, 255, 0],  // Orange
        outline: {
          color: [255, 255, 255], // White
          width: 1
        }
      };
      const popupTemplate = {
        title: "{Name}",
        content: "{Description}"
      }
      const attributes = {
        Name: "" + element.full_name,
        Description: "This is a really good description" + element.rockets
      }

      const pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol,

        attributes: attributes,
        popupTemplate: popupTemplate
      });
      this.graphicsLayerLaunch.add(pointGraphic);
      x = x + 1;
    });
  }

  async filter() {
    //await this.update_everything();

    //Record whether checkboxes are selected
    this.showLaunchpads = (<HTMLInputElement>document.getElementById("spacex-launchpads")).checked;
    this.showStarlink = (<HTMLInputElement>document.getElementById("spacex")).checked;
    this.showNasa = (<HTMLInputElement>document.getElementById("nasa")).checked;

    //Filter by name (ID in some situations)
    let name = (<HTMLInputElement>document.getElementById("name")).value;
    if (name != null) {
      if (this.launchpads)
        this.filtered_launchpads = this.launchpads.filter(item => item!.name!.includes(name));
      if (this.observatory_Locations)
        this.filtered_observatories = this.observatory_Locations.filter(item => item!.id!.includes(name));
      if (this.starlinks)
        this.filtered_starlinks = this.starlinks.filter(item => item!.id!.includes(name));
    } else {
      this.filtered_launchpads = this.launchpads;
      this.filtered_observatories = this.observatory_Locations;
      this.filtered_starlinks = this.starlinks;
    }

  }

}
