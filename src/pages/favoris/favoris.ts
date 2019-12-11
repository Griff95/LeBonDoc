import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { OffresPage } from '../offres/offres';
import { OffreSimplePage } from '../offres/offre-simple/offre-simple';
import { OffresFav } from './offresfav';


import { Storage } from '@ionic/storage';
import {Offre} from "../../models/Offre";

@Component({
  selector: 'page-favoris',
  templateUrl: 'favoris.html'
})
export class FavorisPage {

  offres = Offre;

  constructor(public storage : Storage, private modalCtrl: ModalController,  public global: OffresFav) {

    storage.get('offres').then((val) => {
    this.offres = val;
  });



  }
  onLoadOffre(offre: {name: string, description: string[]}) {
    let modal = this.modalCtrl.create(OffreSimplePage, {offre: offre});
    modal.present();
  }

}
