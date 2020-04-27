import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingController, ModalController, ToastController} from 'ionic-angular';
import { DeposerFormPage } from './deposer-form/deposer-form';
import {AdService} from "../../services/ad.service";
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {Ad} from "../../models/Ad";
import {OffreSimplePage} from "../offres/offre-simple/offre-simple";
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {NgZone} from "@angular/core";


@Component({
  selector: 'page-deposer',
  templateUrl: 'deposer.html'
})
export class DeposerPage {

  userAds : Ad[] = [];

  constructor(private authService: AuthService,
              private loadingCtrl: LoadingController,
              private modalCtrl: ModalController,
              private adService: AdService,
              private toastCtrl: ToastController,
              private zone: NgZone,
              public navCtrl: NavController) {

  }

  ionViewWillEnter(){
    this.adService.getUserAds().then(
        (ads:[]) => {
          this.zone.run(() => {
            this.userAds = ads;
          })
        }, (err) => {
          console.log('Fetch userAds error: ' + JSON.stringify(err));
        }
    );
  }

  createNewAd() {
    this.navCtrl.push(DeposerFormPage);
  }

  onLoadOffre(offre: Ad) {
    let modal = this.modalCtrl.create(OffreSimplePage, {offre: offre});
    modal.present();
    modal.onDidDismiss(() => this.ionViewWillEnter());
  }
}
