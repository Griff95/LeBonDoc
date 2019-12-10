import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FavorisPage } from '../../favoris/favoris';
import { OffresPage } from '../offres';


@Component({
  selector: 'page-offre-simple',
  templateUrl: 'offre-simple.html',
})
export class OffreSimplePage implements OnInit {
  

  offre: {
    name: string,
    description: string[],
    isFav: boolean
  };
  constructor(public navParams: NavParams, public viewCtrl: ViewController, public storage : Storage) {

  }

  ngOnInit() {
    this.offre = this.navParams.get('offre');
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  fav(offre) {
    if (offre.isFav == false) {
      offre.isFav = true;
      
      
    }
    else {
      offre.isFav = false;
    }
    
  }
}