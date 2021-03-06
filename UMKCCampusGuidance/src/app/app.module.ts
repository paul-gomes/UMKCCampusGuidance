import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { NgCalendarModule } from "ionic2-calendar";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { LaunchNavigator } from "@ionic-native/launch-navigator/ngx";
import { Camera } from "@ionic-native/Camera/ngx";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { ModalPageComponent } from "./modal-page/modal-page.component";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";

const UMKCCampusFireBase = {
  apiKey: "AIzaSyAhF2kSBAYoA4HRMA4Tkw60FuMGC6fABEI",
  authDomain: "umkccampusguidance.firebaseapp.com",
  databaseURL: "https://umkccampusguidance.firebaseio.com",
  projectId: "umkccampusguidance",
  storageBucket: "umkccampusguidance.appspot.com",
  messagingSenderId: "602152243652",
  appId: "1:602152243652:web:6c457413b4b6a215921491",
  measurementId: "G-7NHWDG3EGN",
};

@NgModule({
  declarations: [AppComponent, ModalPageComponent],
  entryComponents: [ModalPageComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgCalendarModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(UMKCCampusFireBase),
  ],
  providers: [
    Geolocation,
    InAppBrowser,
    LaunchNavigator,
    StatusBar,
    SplashScreen,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
