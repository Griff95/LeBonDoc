import { Component } from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  private isAuth: boolean;
  private content: any;
  private menuCtrl: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

  }


}
