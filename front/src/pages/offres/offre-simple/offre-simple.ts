import {Component, NgZone, OnInit} from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { OffresFav } from '../../favoris/offresfav';
import {Ad} from "../../../models/Ad";
import {UserProfile} from "../../../models/UserProfile";
import {AdService} from "../../../services/ad.service";
import {AccountService} from "../../../services/account.service";




@Component({
  selector: 'page-offre-simple',
  templateUrl: 'offre-simple.html',
})
export class OffreSimplePage implements OnInit {

  userProfil: UserProfile = this.accountService.userProfil;
  offre: Ad;
  promise;
  user;
  date;

  constructor(public navParams: NavParams,
              public viewCtrl: ViewController,
              public global: OffresFav,
              private adService: AdService,
              private accountService: AccountService,
              public ownerUserProfil: UserProfile,
              private zone: NgZone) {

  }

  ngOnInit() {
   
    this.adService.getAd(this.navParams.get('offre')._id).then((ad: Ad) => this.offre = ad)

  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  fav(offre) {
    console.log(this.userProfil);
    this.adService.addToFavorites(this.navParams.get('offre')._id)
    //this.adService.removeFavorites(this.navParams.get('offre')._id)
    console.log(this.userProfil.favorites);
    //console.log(this.navParams.get('offre')._id)
    /*
    this.userProfil.addFavorites;
    if (offre.isAvailable == true) {
      offre.isAvailable = false;
      this.global.offresfav.push(offre);
      
      
    
    }
    else {
      offre.isAvailable = true;
      //this.userProfil.favoris.splice(this.userProfil.favoris.indexOf(offre.name),1);
      //this.global.offresfav.splice(this.global.offresfav.indexOf(offre.name),1);
   
    }
    */
  }

  deleteOffre(offre){
    this.adService.deleteAd(this.offre._id);
    this.viewCtrl.dismiss();

  }

  contactOwner(offre){

  }
}
