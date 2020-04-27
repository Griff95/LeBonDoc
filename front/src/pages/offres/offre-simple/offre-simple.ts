import {Component, NgZone, OnInit} from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import {Ad} from "../../../models/Ad";
import {UserProfile} from "../../../models/UserProfile";
import {AdService} from "../../../services/ad.service";
import {AccountService} from "../../../services/account.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../../services/auth.service";
import {JsonService} from "../../../services/json.service";


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
              private adService: AdService,
              private accountService: AccountService,
              private authService : AuthService,
              private zone: NgZone,
              private jsonService : JsonService) {

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
    this.jsonService.getStructureTypes();
    this.jsonService.getMedicalFields();
    this.jsonService.getAdTypes();
    this.adService.getAd(this.navParams.get('offre')._id).then((ad: Ad) => {
      this.offre = ad;
      console.log("found ad :");
      console.log(ad);
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
            this.adService.getUserFavorites();
            console.log(data);
          }, (err) => {console.log(err.toString())}
      );
    } else {
      this.adService.addToFavorites(JSON.stringify({ id: id })).then(
          (data) => {
            this.accountService.getAccount(this.authService.getUserId());
            this.adService.getUserFavorites();
            console.log(data);
          }, (err) => {console.log(err.toString())}
      );
    }
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
