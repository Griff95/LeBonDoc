import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { OffreSimplePage } from './offre-simple/offre-simple';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-offres',
  templateUrl: 'offres.html'
})
export class OffresPage {

  offresList = [
    {
      name: 'Medecin generaliste , Corse',
      description: [
        'Nous recherchons un medecin generaliste disponible afin de remplacer un medecin'
      ],
      isFav: false
    },
    {
      name: 'Dentiste, Toulouse',
      description: [
        'Nous recherchons un dentiste pour remplacer un depart a la retraite'
      ],
      isFav: false
    },
    {
      name: 'Psychologue, Toulouse',
      description: [
        'Nous recherchons un Psychologue pour rejoindre l équipe de l hopital XXX'
      ],
      isFav: false
    }
  ];

  constructor(private modalCtrl: ModalController, public storage : Storage) {
  storage.set('offres', this.offresList);
  }

  onLoadOffre(offre: {name: string, description: string[]}) {
    let modal = this.modalCtrl.create(OffreSimplePage, {offre: offre});
    modal.present();
  }
}
