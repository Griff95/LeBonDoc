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
      name: 'Chips , Corse',
      description: [
        'Nous recherchons un chômeur disponible afin de tester nos installations le 13/13/113 après 14h par contre'
      ],
      isFav: false
    },
    {
      name: 'Pingouin, 94',
      description: [
        'Nous recherchons un talentueux pilote qui participera au grand prix de France le 01/01/2020 all night long'
      ],
      isFav: false
    },
    {
      name: 'Psychologue, Toulouse',
      description: [
        'Nous attendons un miracle afin de soigner T-Bur, notre DJ national de son incurable démence le vendredi 13 à 8h30'
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
