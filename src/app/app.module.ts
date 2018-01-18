import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MaraudersMap } from './app.component';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/signup/signup';
import { MapPage, NearbyPopoverPage } from '../pages/map/map';
import { FriendsPage } from '../pages/friends/friends';
import { HelpPage, SettingsPage } from '../pages/settings/settings';

import { HttpModule } from "@angular/http";

import { UserServiceProvider } from '../providers/user-service/user-service';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
import { Network } from "@ionic-native/network";
import { Geolocation } from "@ionic-native/geolocation";
import { FriendRefresher } from "../refreshers/friendRefresher";
import { RelationshipServiceProvider } from '../providers/relationship-service/relationship-service';
import { MapServiceProvider } from '../providers/map-service/map-service';

@NgModule({
  declarations: [
    MaraudersMap,
    HomePage,
    LoginPage,
    SignUpPage,
    MapPage,
    FriendsPage,
    SettingsPage,
    FriendRefresher,
    HelpPage,
    NearbyPopoverPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MaraudersMap),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MaraudersMap,
    HomePage,
    LoginPage,
    SignUpPage,
    MapPage,
    FriendsPage,
    SettingsPage,
    FriendRefresher,
    HelpPage,
    NearbyPopoverPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    ConnectivityServiceProvider,
    Network,
    Geolocation,
    RelationshipServiceProvider,
    MapServiceProvider,
  ]
})
export class AppModule {}
