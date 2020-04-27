import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { OffreSimplePage } from '../offres/offre-simple/offre-simple';
import {Subscription} from "rxjs";
import { Ad } from '../../models/Ad';
import {AdService} from "../../services/ad.service";


@Component({
  selector: 'page-favoris',
  templateUrl: 'favoris.html'
})
export class FavorisPage {

  favoris: Ad[];
  favorisSub : Subscription;
 /*  userProfil: UserProfile;
  userProfilSubscription: Subscription; */  

  constructor(private modalCtrl: ModalController,
              private adService : AdService) {
   }

ngOnInit(){
    this.favorisSub = this.adService.userFavoritesAds$.subscribe( (fav : Ad[]) => {
      this.favoris = fav;
    });
  this.adService.getUserFavorites();
}


  onLoadOffre(offre: Ad) {
    let modal = this.modalCtrl.create(OffreSimplePage, {offre: offre});
    modal.onDidDismiss( () => {
      this.adService.getUserFavorites();
    });
    modal.present();
  }

}
