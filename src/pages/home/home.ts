import { Component } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import { ConnexionPage } from '../connexion/connexion';
import {InscriptionPage } from '../inscription/inscription'
import {OffresPage} from "../offres/offres";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public modalCtrl: ModalController) {}

  onGoToConnexion() {
    let modal = this.modalCtrl.create(ConnexionPage);
    modal.present();
  }
  onGoToInsciption(){
    let modal = this.modalCtrl.create(InscriptionPage);
    modal.present();
  }

}
