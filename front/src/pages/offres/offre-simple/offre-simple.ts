import {Component, NgZone, OnInit} from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { OffresFav } from '../../favoris/offresfav';
import {Ad} from "../../../models/Ad";
import {UserProfile} from "../../../models/UserProfile";
import {AdService} from "../../../services/ad.service";
import {AccountService} from "../../../services/account.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../../services/auth.service";
import {setStyles} from "@angular/animations/browser/src/util";




@Component({
  selector: 'page-offre-simple',
  templateUrl: 'offre-simple.html',
})
export class OffreSimplePage implements OnInit {

  userProfilSub : Subscription;
  userProfil: UserProfile;
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
              private authService : AuthService,
              private zone: NgZone) {

  }

  ngOnInit() {
    this.userProfilSub = this.accountService.userProfil$.subscribe((profile: UserProfile) => {
      this.zone.run(() => {
        this.userProfil = profile;
        const heart = document.getElementById('fav-heart');
        if (this.userProfil.favorites.includes(this.navParams.get('offre')._id)) {
          heart.setAttribute("style", "color:blue");
        } else {
          heart.setAttribute("style", "color:black");
        }
      });
    });
    this.accountService.getAccount(this.authService.getUserId());
    this.adService.getAd(this.navParams.get('offre')._id).then((ad: Ad) => {
      this.offre = ad;
    });
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  favorites() {
    console.log(this.offre);
    const id = this.navParams.get('offre')._id;
    if (this.userProfil.favorites.includes(id)) {
      this.adService.removeFavorites(JSON.stringify({ id: id })).then(
          (data) => {
            this.accountService.getAccount(this.authService.getUserId());
            console.log(data);
          }, (err) => {console.log(err.toString())}
      );
    } else {
      this.adService.addToFavorites(JSON.stringify({ id: id })).then(
          (data) => {
            this.accountService.getAccount(this.authService.getUserId());
            console.log(data);
          }, (err) => {console.log(err.toString())}
      );
    }
    //this.adService.removeFavorites(this.navParams.get('offre')._id)
    //console.log(this.userProfil.favorites);
    //console.log(this.navParams.get('offre')._id)

  }

  deleteOffre(offre){
    this.adService.deleteAd(this.offre._id);
    this.viewCtrl.dismiss();

  }

  contactOwner(offre){

  }

  ngOnDestroy(){
    this.userProfilSub.unsubscribe();
  }
}
