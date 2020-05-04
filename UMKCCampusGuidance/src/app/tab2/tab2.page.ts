import { Component } from "@angular/core";
import { Map, tileLayer, marker, icon, popup } from "leaflet";
import { IBuilding } from "./buuilding";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import {
  LaunchNavigator,
  LaunchNavigatorOptions,
} from "@ionic-native/launch-navigator/ngx";
import { StorageService } from "../storage/storage.service";
import { IClasses } from "./classes";
import { IUserClassInfo, ICourse } from "./userClassInfo";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  map: Map;
  buildings: IBuilding[];
  classes: IClasses[];
  userClassInfo: IUserClassInfo[] = [];
  startBtn: any;

  constructor(
    private launchNavigator: LaunchNavigator,
    private storage: StorageService
  ) {}

  ionViewDidEnter() {
    this.loadMap();
  }

  loadMap(): void {
    this.map = new Map("map").setView([39.034924, -94.578561], 50);
    tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "UMKC Campus Guidance",
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
      .then((res) => res.json())
      .then((json) => {
        this.buildings = json.buildings;
        this.createMarker();
      });
  }

  createMarker(): void {
    let buildingIcon = icon({
      iconUrl: "./assets/icon/building.png",
      iconSize: [38, 45], // size of the icon
    });

    for (const building of this.buildings) {
      marker([building.lat, building.long], { icon: buildingIcon })
        .addTo(this.map)
        .on("click", () => this.getDirection(building.lat, building.long));
    }
    this.createPopUp();
  }

  createPopUp(): void {
    this.classes = JSON.parse(JSON.stringify(this.storage.getBuildings()));
    console.log(this.classes);

    for (const c of this.classes) {
      if (this.userClassInfo && this.userClassInfo.length > 0) {
        if (
          this.userClassInfo.filter((u) => u.building === c.building).length ==
          0
        ) {
          const course: ICourse = {
            courseName: c.courseName,
            room: c.room,
          };

          const classBuilding: [IBuilding] = JSON.parse(
            JSON.stringify(this.buildings.filter((b) => b.name === c.building))
          );

          const classInfo: IUserClassInfo = {
            building: c.building,
            lat:
              classBuilding && classBuilding.length > 0
                ? classBuilding[0].lat
                : null,
            long:
              classBuilding && classBuilding.length > 0
                ? classBuilding[0].long
                : null,
            courses: [course],
          };

          this.userClassInfo.push(classInfo);
        } else {
          const existingClassInfo: [IUserClassInfo] = JSON.parse(
            JSON.stringify(
              this.userClassInfo.filter((u) => u.building === c.building)
            )
          );

          const index: number = this.userClassInfo.findIndex(
            (obj) => obj.building == existingClassInfo[0].building
          );

          const course: ICourse = {
            courseName: c.courseName,
            room: c.room,
          };

          existingClassInfo[0].courses.push(course);

          this.userClassInfo[index] = existingClassInfo[0];
        }
      } else {
        const course: ICourse = {
          courseName: c.courseName,
          room: c.room,
        };

        const classBuilding: [IBuilding] = JSON.parse(
          JSON.stringify(this.buildings.filter((b) => b.name === c.building))
        );

        const classInfo: IUserClassInfo = {
          building: c.building,
          lat:
            classBuilding && classBuilding.length > 0
              ? classBuilding[0].lat
              : null,
          long:
            classBuilding && classBuilding.length > 0
              ? classBuilding[0].long
              : null,
          courses: [course],
        };
        this.userClassInfo.push(classInfo);
      }
    }
    console.log(this.userClassInfo);

    for (const building of this.userClassInfo) {
      let popUpMsg = `Building: ${
        building.building
      }</br> Courses: </br>${building.courses.map(
        (r) => `Course: ${r.courseName}</br>Room#: ${r.room}</br>`
      )}`;

      marker([building.lat, building.long])
        .addTo(this.map)
        .bindPopup(`${popUpMsg}`, {
          closeOnClick: false,
          autoClose: false,
        })
        .openPopup();
    }
  }

  getDirection(lat, long): void {
    this.launchNavigator.navigate([lat, long]);
  }
}
