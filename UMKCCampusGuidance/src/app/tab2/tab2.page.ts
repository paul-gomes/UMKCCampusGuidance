import { Component } from "@angular/core";
import { Map, tileLayer, marker } from "leaflet";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page {
  map: Map;
  constructor() {}

  ionViewDidEnter() {
    this.loadMap();
  }

  loadMap(): void {
    this.map = new Map("map").setView([39.034924, -94.578561], 25);
    tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY- SA</a>'
    }).addTo(this.map); // This line is added to add the Tile Layer to our map
  }
}
