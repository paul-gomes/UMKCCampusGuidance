import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import {NgCalendarModule} from 'ionic2-calendar';

const UMKCCampusFireBase = {
  apiKey: 'AIzaSyAhF2kSBAYoA4HRMA4Tkw60FuMGC6fABEI',
  authDomain: 'umkccampusguidance.firebaseapp.com',
  databaseURL: 'https://umkccampusguidance.firebaseio.com',
  projectId: 'umkccampusguidance',
  storageBucket: 'umkccampusguidance.appspot.com',
  messagingSenderId: '602152243652',
  appId: '1:602152243652:web:6c457413b4b6a215921491',
  measurementId: 'G-7NHWDG3EGN'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(UMKCCampusFireBase),
    NgCalendarModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
