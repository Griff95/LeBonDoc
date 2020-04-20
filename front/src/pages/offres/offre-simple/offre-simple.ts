import { Component, OnInit } from '@angular/core';
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
  //ownerUserProfil: any;
  offre: Ad;
  promise;
  user;
  date;

  constructor(public navParams: NavParams,
              public viewCtrl: ViewController,
              public global: OffresFav,
              private adService: AdService,
              private accountService: AccountService,
              public ownerUserProfil: UserProfile) {

  }

  ngOnInit() {
/*     this.userProfil = 

    {
      userId:"thretgrgraffz",
      nom: "Bocquet",
      prenom: "Rémi",
      telephone: "0687702166",
      email: "bocquetrem@eisti.eu",
      dateDeNaissance: new Date(),
      isVerified: false,
      offres: [],
      favoris: [],
      specialite: Specialite.Dentiste,
      codePostal: 52000,
      unMotSurMoi: "C'est le jour 1"
    }
  ; */
    this.offre = this.navParams.get('offre');
    console.log(this.offre);
    console.log(this.userProfil);



    this.promise = this.adService.getAd(this.offre._id);

    this.promise.then((data) => {this.offre=data}).catch((error)=>{console.log(error)})

  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  fav(offre) {
    if (offre.isAvailable == true) {
      offre.isAvailable = false;
      this.global.offresfav.push(offre);

/*       console.log(this.global.offresfav);
 *//*       this.userProfil.favoris.push(offre);
 *//*       console.log(this.userProfil.favoris);
 */
    
    }
    else {
      offre.isAvailable = true;
/*       this.userProfil.favoris.splice(this.userProfil.favoris.indexOf(offre.name),1);
 */      this.global.offresfav.splice(this.global.offresfav.indexOf(offre.name),1);
   
    }
  }

  deleteOffre(offre){

  }

  contactOwner(offre){

  }
}
