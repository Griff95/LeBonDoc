import { Component } from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {OffreSimplePage} from "../offres/offre-simple/offre-simple";
import {OffresPage} from "../offres/offres";

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

}
