import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { OffreSimplePage } from '../offres/offre-simple/offre-simple';
import {AccountService} from '../../services/account.service';
import { UserProfile } from '../../models/UserProfile';
import {Subscription} from "rxjs";
import { OffresFav } from '../favoris/offresfav';
import { Ad } from '../../models/Ad';


@Component({
  selector: 'page-favoris',
  templateUrl: 'favoris.html'
})
export class FavorisPage {

 /*  userProfil: UserProfile;
  userProfilSubscription: Subscription; */  

  constructor(private modalCtrl: ModalController,public global: OffresFav) {
   }

/*    ngOnInit(){

        this.userProfil = 

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
        ;
  

  } */


  onLoadOffre(offre: Ad) {
    let modal = this.modalCtrl.create(OffreSimplePage, {offre: offre});
    modal.present();
  }

}
