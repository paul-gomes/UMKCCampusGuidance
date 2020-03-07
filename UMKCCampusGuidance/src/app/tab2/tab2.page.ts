import { Component } from "@angular/core";
import { Map, tileLayer, marker, icon, circle } from "leaflet";
import { IBuilding } from "./buuilding";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page {
  map: Map;
  buildings: [IBuilding];
  isCurrentLocationShown: boolean = false;
  constructor() {}

  ionViewDidEnter() {
    this.loadMap();
  }

  loadMap(): void {
    this.map = new Map("map").setView([39.034924, -94.578561], 25);
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
      let popUpMsg = `<h5>${building.name}</h5><ion-button size="small">
      <ion-icon slot="icon-only" name="navigate-circle"></ion-icon>
    </ion-button>`;
      marker([building.lat, building.long], { icon: buildingIcon })
        .addTo(this.map)
        .bindPopup(`${popUpMsg}`, {
          closeOnClick: false,
          autoClose: false
        })
        .openPopup();
    }
  }

  currentLocation(): void {
    this.isCurrentLocationShown = true;
    this.map
      .locate({ setView: true, maxZoom: 20 })
      .on("locationfound", (e: any) => {
        circle(e.latlng, {
          color: "red",
          fillColor: "#f03",
          radius: e.accuracy / 3
        }).addTo(this.map);
      });
  }

  backToCampus(): void {
    this.isCurrentLocationShown = false;
    this.map.remove();
    this.loadMap();
  }
}
