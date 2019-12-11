import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { OffreSimplePage } from './offre-simple/offre-simple';
import { Storage } from '@ionic/storage';
import {Offre} from "../../models/Offre";
import {OffresService} from "../../services/offres.service";

@Component({
  selector: 'page-offres',
  templateUrl: 'offres.html'
})
export class OffresPage {

  offresList: Offre[];

  constructor(private modalCtrl: ModalController, public storage : Storage,private offresService: OffresService) {
  storage.set('offres', this.offresList);
  }

  ionViewWillEnter(){
    this.offresList = this.offresService.offresList.slice();
  }

  onLoadOffre(offre: {name: string, description: string[], lieux: string}) {
    let modal = this.modalCtrl.create(OffreSimplePage, {offre: offre});
    modal.present();
  }
}
