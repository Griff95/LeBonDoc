import { Component } from '@angular/core';
import {ModalController, NavController,ViewController} from 'ionic-angular';
import { ConnexionPage } from '../connexion/connexion';
import {InscriptionPage } from '../inscription/inscription'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public modalCtrl: ModalController, public viewCtrl: ViewController) {}

  onGoToConnexion() {
    let modal = this.modalCtrl.create(ConnexionPage);
    modal.present();
  }
  onGoToInsciption(){
    let modal = this.modalCtrl.create(InscriptionPage);
    modal.present();
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }
}
