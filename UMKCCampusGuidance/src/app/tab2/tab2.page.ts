import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { Map, tileLayer, marker, icon, circle, popup } from "leaflet";
import { IBuilding } from "./buuilding";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import {
  LaunchNavigator,
  LaunchNavigatorOptions
} from "@ionic-native/launch-navigator/ngx";
import { IonButton } from "@ionic/angular";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page implements AfterViewInit {
  map: Map;
  buildings: [IBuilding];
  startBtn: any;
  //@ViewChild("myHref") myMap;

  constructor(private launchNavigator: LaunchNavigator) {}

  ionViewDidEnter() {
    this.loadMap();
  }

  loadMap(): void {
    this.map = new Map("map").setView([39.034924, -94.578561], 50);
    tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "UMKC Campus Guidance"
    }).addTo(this.map); // This line is added to add the Tile Layer to our map

    // this.map.on("click", <LeafletMouseEvent>(e) => {
    //   console.log(e);
    //   var coord = e.latlng;
    //   var lat = coord.lat;
    //   var lng = coord.lng;
    //   console.log(
    //     "You clicked the map at latitude: " + lat + " and longitude: " + lng
    //   );
    // });

    fetch("./assets/buildings.json")
      .then(res => res.json())
      .then(json => {
        this.buildings = json.buildings;
        this.createMarker();
      });
  }

  createMarker(): void {
    let buildingIcon = icon({
      iconUrl: "./assets/icon/building.png",
      iconSize: [38, 45] // size of the icon
    });

    for (const building of this.buildings) {
      let popUpMsg = `${building.name}`;
      marker([building.lat, building.long], { icon: buildingIcon })
        .addTo(this.map)
        .bindPopup(`${popUpMsg}`, {
          closeOnClick: false,
          autoClose: false
        })
        .on("click", () => this.getDirection(building.lat, building.long))
        .openPopup();
    }
  }

  getDirection(lat, long): void {
    this.launchNavigator.navigate([lat, long]);
  }

  ngAfterViewInit() {
    var input = document.getElementById("myHref");
    console.log(input);
    //input.addEventListener("click", (e: Event) => console.log("got it"));
  }
}
