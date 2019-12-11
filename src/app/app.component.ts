import { Component } from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import * as firebase from 'firebase';
import {DashboardPage} from "../pages/dashboard/dashboard";
import {OffresPage} from "../pages/offres/offres";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  private isAuth: boolean;
  private content: any;
  private menuCtrl: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      let firebaseConfig = {
      apiKey: "AIzaSyBd1xGDso154dUpM1j6bQto0X5zNyrezKA",
      authDomain: "lebondoc-eisti.firebaseapp.com",
      databaseURL: "https://lebondoc-eisti.firebaseio.com",
      projectId: "lebondoc-eisti",
      storageBucket: "lebondoc-eisti.appspot.com",
      messagingSenderId: "56679413695",
      appId: "1:56679413695:web:6613f6373e1958e643d30a",
      measurementId: "G-VQ1JENQ81S"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

      firebase.auth().onAuthStateChanged(
       (user) => {
         if (user) {
           this.isAuth = true;
           this.content.push(OffresPage);
         } else {
           this.isAuth = false;
           this.content.push(HomePage);
         }
       }
     );

    });
  }

  onDisconnect() {
    firebase.auth().signOut();
    this.menuCtrl.close();
  }
}
